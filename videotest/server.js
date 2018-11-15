const sio = require('socket.io');
console.log('server started')
const https = require('https');
const fs = require('fs');

const appOptions = { 
    key: fs.readFileSync(__dirname + '/rtc-video-room-key.pem'),
    cert: fs.readFileSync(__dirname + '/rtc-video-room-cert.pem')
};

let server = https.createServer(appOptions).listen(3001);

let availableRooms = [];
let io = sio(server);
io.on('connection', (client) => {
    let room;
    let messageId = 1;
    console.log('A user connected');

    client.on('message', clientData => {
        console.log(clientData);
        var messageContent = {
            id: messageId,
            roomId: clientData.roomId,
            senderId: clientData.senderId,
            messageContent: clientData.messageContent
        }
        messageId++;
        console.log('A user as send a message to room '+clientData.roomId+' with text '+clientData.messageContent);
        client.to(clientData.roomId).emit('message', messageContent);
    });
        
    

    client.on('leave', clientData => {
        client.leave(clientData.roomId)
        client.broadcast.to(clientData.roomId).emit('hangup')
    });

    client.on('find', clientData => {
        var data = requestRoom(clientData);
        room = data.room;
        client.join(room);
        console.log('A user connected to room '+room);
        client.emit('room', data)
    });
});

function requestRoom(clientData) {
    if (clientData.type !== 'x') {
        var room;
        var clientId 
        if (availableRooms.length > 0) {
            room = availableRooms.pop();
            clientId = Math.floor(Math.random() * (10000000 - 1000000) + 1000000);
        } else {
            room = Math.floor(Math.random() * (10000000 - 1000000) + 1000000);
            clientId = Math.floor(Math.random() * (10000000 - 1000000) + 1000000);
            availableRooms.push(room);
        }
        var data = {
            'room' : room,
            'clientId' : clientId
        }
        return data;
    } else {
        return data = {
            //'room' : clientData.room,
            'room' : 'testRoom',
            'clientId' : clientData.clientId
        };
    }
}