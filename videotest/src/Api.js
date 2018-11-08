import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:3001');

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

export {leave, sendMessage, find, updateMessage}