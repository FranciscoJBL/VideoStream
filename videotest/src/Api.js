import openSocket from 'socket.io-client';

const socket = openSocket('localhost:3001', {secure: true});

function getSocket() {
    return socket;
}

function leave(cb) {
}

function sendMessage(clientData) {
    
    socket.emit('message', clientData)
}

function updateMessage(cb) {
    socket.on( 'message', messageContent => {
        cb(messageContent)
    })
}

function find(clientData, cb) {
    socket.on('room', room => 
        cb(room)
    )
    socket.emit('find', clientData);
}

export {leave, sendMessage, find, updateMessage, getSocket}