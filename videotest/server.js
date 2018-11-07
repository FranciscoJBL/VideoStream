const io = require('socket.io')();
console.log('server started')
io.on('connection', (client) => {
    let room = ''; 

    client.on('message', message => client.broadcast.to(room).emit('message', message));

    client.on('leave', () => {
        client.leave(room)
        client.broadcast.to(room).emit('hangup')
    });

    client.on('find', clientData => {
        console.log('find');
        room = requestRoom(clientData);
        client.join(room);
        client.emit('room', room)
    });
});

function requestRoom(clientData) {
    console.log(clientData);
    return clientData;
}

const port = 3001;
io.listen(port);