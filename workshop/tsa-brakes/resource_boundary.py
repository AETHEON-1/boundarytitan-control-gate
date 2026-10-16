"""Sandbox resource-side process with role-separated IPC. NOT OS-admin isolation.

Requester endpoint can only submit commit attempts. Owner endpoint alone can
register or stop. SQLite resource and witness remain under one host principal.
"""
import multiprocessing as mp
from multiprocessing.connection import wait
from transactional_brake import Brake

def _serve(resource_path, witness_path, requester, owner):
    gate = Brake(resource_path, witness_path)
    try:
        alive = True
        while alive:
            for channel in wait([requester, owner]):
                try:
                    message = channel.recv()
                except EOFError:
                    alive = False
                    break
                try:
                    command = message.get("command")
                    if channel is requester:
                        if command != "commit":
                            raise PermissionError("REQUESTER_CANNOT_MUTATE_AUTHORITY")
                        result = gate.commit(message["task"], message["token"], message.get("epoch",1))
                    else:
                        if command == "register":
                            result = gate.register(message["task"], message.get("budget",1))
                        elif command == "stop":
                            result = gate.stop(message["task"])
                        elif command == "shutdown":
                            alive = False
                            result = True
                        else:
                            raise PermissionError("OWNER_COMMAND_DENIED")
                    channel.send({"ok": True, "result": result})
                except Exception as exc:
                    channel.send({"ok": False, "error": type(exc).__name__ + ":" + str(exc)})
    finally:
        gate.close()
        requester.close()
        owner.close()

class Endpoint:
    def __init__(self, connection):
        self.__connection = connection
    def call(self, command, **kwargs):
        self.__connection.send({"command":command,**kwargs})
        return self.__connection.recv()
    def close(self):
        self.__connection.close()

def launch(resource_path, witness_path):
    request_client, request_server = mp.Pipe()
    owner_client, owner_server = mp.Pipe()
    process = mp.Process(target=_serve,args=(resource_path,witness_path,request_server,owner_server))
    process.start()
    request_server.close()
    owner_server.close()
    return process, Endpoint(request_client), Endpoint(owner_client)
