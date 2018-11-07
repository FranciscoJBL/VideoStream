const io = require('socket.io')();
console.log('server started')
let availableRooms = [];

io.on('connection', (client) => {
    let room;

    console.log('A user connected');

    client.on('message', clientData => client
        .broadcast
        .to(clientData.roomId)
        .emit('message', clientData.messageContent)
    );

    client.on('leave', clientData => {
        client.leave(clientData.roomId)
        client.broadcast.to(clientData.roomId).emit('hangup')
    });

    client.on('find', clientData => {
        console.log('find');
        room = requestRoom(clientData);
        client.join(room);
        console.log('A user connected to room '+room);
        client.emit('room', room)
    });
});


function requestRoom(clientData) {
    if (clientData.type !== 'x') {
        var room;
        if (availableRooms.length > 0) {
            console.log('a');
            console.log(availableRooms.length);
            room = availableRooms.pop();
            return room;
        } else {
            console.log('b');
            console.log(availableRooms.length);
            room = Math.floor(Math.random() * (10000000 - 1000000) + 1000000);
            availableRooms.push(room);
            console.log(availableRooms)
            return room;
        }
    } else {
        return clientData.roomId;
    }
}

const port = 3001;
io.listen(port);