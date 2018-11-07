import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

function leave(cb) {
}

function message(message, cb) {
}

function find(clientData, cb) {
    socket.on('room', roomId => cb(roomId))
    socket.emit('find', clientData);
}

export {leave, message, find}