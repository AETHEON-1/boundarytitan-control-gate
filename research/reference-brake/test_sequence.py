"""Seeded 200-step randomized state-machine regression (fixture semantics)."""
import random, unittest
from brake_v2 import Lab
class Sequences(unittest.TestCase):
    def test_randomized(self):
        rng=random.Random(20261017)
        lab=Lab()
        try:
            grants=[]; versions={'a':0,'b':0}; used=set()
            for i in range(200):
                op=rng.choice(['grant','grant','revoke','commit'])
                who=rng.choice(['a','b'])
                if op=='grant':
                    nonce=f'n{i}'
                    token=lab.call('grant',who,'write',nonce)
                    grants.append((token,who,nonce,versions[who]))
                elif op=='revoke':
                    versions[who]+=1
                    lab.call('revoke',who)
                elif grants:
                    token,who,nonce,version=rng.choice(grants)
                    expected=(version==versions[who] and (who,nonce) not in used)
                    actual=lab.call('commit',token,who,'write',nonce)
                    self.assertEqual(actual,expected,f'iteration {i}')
                    if actual: used.add((who,nonce))
        finally: lab.close()
if __name__=='__main__': unittest.main()
