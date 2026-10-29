"""Offline, reproducible import of official CVE JSON 5 and CISA KEV CSV snapshots.
No network calls. Missing source inputs remain missing, never zero.
"""
import argparse, collections, csv, datetime as dt, hashlib, json, pathlib, zipfile
ROOT=pathlib.Path(__file__).resolve().parent
START=dt.date(2021,1,1); CUTOFF=dt.date(2026,10,29)
MONTHS=[f'{y}-{m:02}' for y in range(2021,2027) for m in range(1,13)]

def digest(path):
    h=hashlib.sha256()
    with open(path,'rb') as f:
        for block in iter(lambda:f.read(1048576),b''):h.update(block)
    return h.hexdigest()

def cve_counts(path):
    counts=collections.defaultdict(set); rejected=collections.Counter(); seen=set()
    def parse(raw):
        try:
            record=json.loads(raw); meta=record['cveMetadata']; ident=meta['cveId']
            if meta.get('state')!='PUBLISHED':return 'non_published'
            date=dt.date.fromisoformat(meta['datePublished'][:10])
            if date> CUTOFF:return 'after_cutoff'
            if not START<=date:return 'outside_period'
            if ident in seen:return 'duplicate_id'
            seen.add(ident);counts[date.strftime('%Y-%m')].add(ident)
        except (ValueError,KeyError,TypeError,UnicodeError):return 'invalid_record'
    if pathlib.Path(path).is_dir():
        paths=pathlib.Path(path).rglob('CVE-*.json')
        for p in paths:
            error=parse(p.read_bytes())
            if error:rejected[error]+=1
    elif zipfile.is_zipfile(path):
        with zipfile.ZipFile(path) as z:
            for name in z.namelist():
                if pathlib.PurePosixPath(name).name.startswith('CVE-') and name.endswith('.json'):
                    error=parse(z.read(name))
                    if error:rejected[error]+=1
    else:raise ValueError('CVE source must be official JSON 5 directory or ZIP')
    return {k:len(v) for k,v in counts.items()},dict(rejected)

def kev_counts(path):
    counts=collections.defaultdict(set); rejected=collections.Counter(); seen=set()
    with open(path,encoding='utf-8-sig',newline='') as f:
        reader=csv.DictReader(f)
        if not {'cveID','dateAdded'}<=set(reader.fieldnames or []):raise ValueError('KEV CSV lacks required headers')
        for row in reader:
            try:
                ident=row['cveID'].strip(); date=dt.date.fromisoformat(row['dateAdded'][:10])
                if not ident.startswith('CVE-'):raise ValueError()
                if date>CUTOFF:rejected['after_cutoff']+=1;continue
                if date<START:rejected['outside_period']+=1;continue
                if ident in seen:rejected['duplicate_id']+=1;continue
                seen.add(ident);counts[date.strftime('%Y-%m')].add(ident)
            except (ValueError,TypeError,KeyError):rejected['invalid_record']+=1
    return {k:len(v) for k,v in counts.items()},dict(rejected)

def main():
    p=argparse.ArgumentParser();p.add_argument('--cve',type=pathlib.Path);p.add_argument('--kev',type=pathlib.Path);p.add_argument('--output',type=pathlib.Path,default=ROOT/'monthly_2021_2026.csv');a=p.parse_args()
    if not a.cve and not a.kev: p.error('Supply --cve and/or --kev; empty import is not a completed ingestion')
    original=list(csv.DictReader(open(ROOT/'monthly_2021_2026.csv',newline='')))
    bymonth={r['month']:r for r in original}
    manifest={'cutoff':str(CUTOFF),'sources':{},'method':'CVE cveMetadata.datePublished; KEV dateAdded; unique CVE identifiers per month','limitations':['Catalog entry date is not exploitation date','Current snapshot can reflect retroactive corrections','No universal remediation or closure denominator']}
    for label,path,func,field,statusfield in [('cve',a.cve,cve_counts,'cve_published','cve_status'),('kev',a.kev,kev_counts,'kev_added','kev_status')]:
        if not path:continue
        counts,rejected=func(path)
        if not counts: raise ValueError(f'{label}: no dated observations in source; refusing to mark months as observed')
        manifest['sources'][label]={'input':str(path),'sha256':digest(path) if path.is_file() else None,'rejected':rejected,'observations':sum(counts.values())}
        for month in MONTHS:
            row=bymonth[month]
            if dt.date.fromisoformat(month+'-01')>CUTOFF:continue
            row[field]=counts.get(month,0)
            row[statusfield]='OBSERVED_OFFICIAL_SNAPSHOT'
    with open(a.output,'w',newline='') as f:
        writer=csv.DictWriter(f,fieldnames=original[0].keys());writer.writeheader();writer.writerows(original)
    (a.output.parent/'import_manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(json.dumps(manifest,indent=2))
if __name__=='__main__':main()
