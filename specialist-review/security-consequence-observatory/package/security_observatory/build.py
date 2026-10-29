import csv, json, calendar, pathlib, datetime, argparse, collections
ROOT=pathlib.Path(__file__).resolve().parent
CUT=datetime.date(2026,10,29)
SOURCES={'cve':'https://github.com/CVEProject/cvelistV5','kev':'https://www.cisa.gov/known-exploited-vulnerabilities-catalog','breach':'https://www.idtheftcenter.org/post/2025-annual-data-breach-report-record-number-compromises/'}
# Annual ITRC figures explicitly sourced from 2025 report. Do not distribute across months.
BREACH={2023:3202,2024:3152,2025:3322}
def build(kev_csv=None):
    kev=collections.Counter(); kev_ids=collections.defaultdict(set)
    if kev_csv:
        with open(kev_csv,encoding='utf-8-sig',newline='') as f:
            for row in csv.DictReader(f):
                day=row.get('dateAdded','')[:10]; ident=row.get('cveID','')
                try: dt=datetime.date.fromisoformat(day)
                except ValueError: continue
                if dt<=CUT and 2021<=dt.year<=2026 and ident: kev_ids[day[:7]].add(ident)
        kev={k:len(v) for k,v in kev_ids.items()}
    cols=['month','cve_published','cve_status','kev_added','kev_status','breaches_reported','breach_status','fully_remediated','remediation_status','verified_paths_closed','closure_status','notes']
    rows=[]
    for y in range(2021,2027):
        for m in range(1,13):
            key=f'{y}-{m:02d}'; future=datetime.date(y,m,1)>CUT
            rows.append([key,'','NOT_APPLICABLE_FUTURE' if future else 'MISSING_SOURCE_DATA',kev.get(key,'') if kev_csv and not future else '', 'NOT_APPLICABLE_FUTURE' if future else ('OBSERVED_CISA_DATE_ADDED' if kev_csv else 'MISSING_SOURCE_DATA'),'', 'NOT_APPLICABLE_FUTURE' if future else 'NOT_AVAILABLE_MONTHLY', '', 'NOT_APPLICABLE_FUTURE' if future else 'NOT_AVAILABLE_MONTHLY','', 'NOT_APPLICABLE_FUTURE' if future else 'NOT_TESTED','KEV additions are catalog entry dates, not exploitation occurrence dates' if kev_csv and not future else ''])
    with open(ROOT/'monthly_2021_2026.csv','w',newline='') as f:
        w=csv.writer(f);w.writerow(cols);w.writerows(rows)
    with open(ROOT/'annual_breaches.csv','w',newline='') as f:
        w=csv.writer(f);w.writerow(['year','itrc_us_data_compromises','status','source']);
        for y in range(2021,2027):w.writerow([y,BREACH.get(y,''),'OBSERVED_REPORT' if y in BREACH else ('INCOMPLETE_YEAR' if y==2026 else 'MISSING_NOT_TRANSCRIBED'),SOURCES['breach'] if y in BREACH else ''])
    with open(ROOT/'sources.json','w') as f:json.dump({'as_of':str(CUT),'sources':SOURCES,'KEV_input':str(kev_csv) if kev_csv else None,'definitions':{'missing':'Blank numeric cells mean unknown, not zero','kev':'Distinct CVE IDs by CISA dateAdded; not exploitation occurrence','breach':'ITRC annual US data compromises, not global incidents','closure':'No comparable public denominator or independently verified closure dataset available'}},f,indent=2)
    print('Wrote 72 monthly rows; KEV:', 'from local input' if kev_csv else 'missing pending source ingestion')
if __name__=='__main__':
    p=argparse.ArgumentParser();p.add_argument('--kev-csv',help='Local official CISA KEV CSV');a=p.parse_args();build(a.kev_csv)
