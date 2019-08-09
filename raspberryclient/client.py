import socketio

sio = socketio.Client()


@sio.event
def initialize(data):
    print('initialize', data)


@sio.event
def connect():
    print('Successfully connected to the server')


@sio.event
def disconnect():
    print("Disconnected from the server")


sio.connect('http://localhost:3000')
