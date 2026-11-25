"""Local baseline only, not Trailmark. Python standard library; no network."""
import ast, hashlib, importlib.util, json, pathlib, sys
ROOT=pathlib.Path(__file__).resolve().parent
P=ROOT/'specimen/recovery_lab.py'
SOURCE=P.read_bytes(); tree=ast.parse(SOURCE)
class Calls(ast.NodeVisitor):
    def __init__(self): self.scope=['module']; self.rows=[]
    def visit_FunctionDef(self,node):
        self.scope.append(node.name); self.generic_visit(node); self.scope.pop()
    def visit_Call(self,node):
        self.rows.append({'caller':'.'.join(self.scope),'callee_expression':ast.unparse(node.func),'line':node.lineno,'column':node.col_offset}); self.generic_visit(node)
v=Calls(); v.visit(tree)
static=v.rows; static_hash=hashlib.sha256(json.dumps(static,sort_keys=True).encode()).hexdigest()
spec=importlib.util.spec_from_file_location('recovery_lab',P); lab=importlib.util.module_from_spec(spec); sys.modules[spec.name]=lab; spec.loader.exec_module(lab)
# Declared expected effects, derived from the stipulated contract before comparison; not independent ground truth.
expected={'restart_preserves_stop':[], 'restart_loses_stop':[5], 'cancel_without_fence':[], 'cancel_without_fence_retry':[7]}
results=[]
for c,_,_ in lab.CASES:
    if c.name not in expected: continue
    observed=set()
    def profile(frame,event,arg):
        if event=='call' and frame.f_code.co_filename==str(P):
            parent=frame.f_back
            if parent and parent.f_code.co_filename==str(P): observed.add((parent.f_code.co_qualname,frame.f_code.co_qualname))
    sys.setprofile(profile)
    try: r=lab.run(c)
    finally: sys.setprofile(None)
    # Alternate observer uses effect journal, not model disposition or forbidden_effects.
    ticks=[e['tick'] for e in r['effects'] if e['action']=='normal' and c.valid_owner and e['tick']>=c.stop_tick]
    results.append({'case':c.name,'source_sha256':hashlib.sha256(SOURCE).hexdigest(),'static_call_expression_sha256':static_hash,'runtime_python_call_pairs':sorted(observed),'forbidden_normal_effect_ticks':ticks,'expected_ticks':expected[c.name],'matches':ticks==expected[c.name],'essential_misses':r['essential_misses'],'trace':r['trace'],'effects':r['effects']})
assert len(results)==4 and all(r['matches'] for r in results)
# One representation-only classifier predicts the majority class (ties choose no violation).
labels=[bool(r['forbidden_normal_effect_ticks']) for r in results]; predicted=[False]*len(labels)
out={'scope':'Python AST baseline; no Trailmark execution; four selected configurations of a single exact source; machine-authored comparison','static_call_expressions':static,'static_call_expression_count':len(static),'static_digest':static_hash,'cases':results,'constant_no_violation_classifier':{'TP':sum(p and y for p,y in zip(predicted,labels)),'TN':sum(not p and not y for p,y in zip(predicted,labels)),'FP':sum(p and not y for p,y in zip(predicted,labels)),'FN':sum(not p and y for p,y in zip(predicted,labels))},'limits':'AST call expressions are not resolved edges; profiling records only same-file Python calls, not C calls, data dependencies or event ordering; journal originates in same simulator; no independent oracle, reviewer or custody.'}
print(json.dumps(out,indent=2))
