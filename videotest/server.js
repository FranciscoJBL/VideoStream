const io = require('socket.io')();
console.log('server started')
io.on('connection', (client) => {

    client.on('message', clientData => 
        client.to(clientData.roomId).emit('message', clientData.messageContent)
    );

    client.on('leave', clientData => {
        client.leave(clientData.roomId)
        client.broadcast.to(clientData.roomId).emit('hangup')
    });

    client.on('find', clientData => {
        console.log('find');
        room = requestRoom(clientData);
        client.join(room);
        client.emit('room', room)
    });
});

function requestRoom(clientData) {
    return 'testRoom';
}

const port = 3001;
io.listen(port);