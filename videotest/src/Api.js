import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

function leave(cb) {
}

function sendMessage(clientData, cb) {
    socket.on( 'message', response => 
        cb(response)
    )
    socket.emit('message', clientData)
}

function find(clientData, cb) {
    socket.on('room', room => 
        cb(room)
    )
    socket.emit('find', clientData);
}

export {leave, sendMessage, find}