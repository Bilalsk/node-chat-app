const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

const publicPath = path.join(__dirname, '../public'); 


app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New User Connected');

    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the Chat App',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New User Connected',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (chat, callback) => {
        console.log('New Message Received');

        io.emit('newMessage', {
            from: chat.from,
            text: chat.text,
            createdAt: new Date().getTime()
        });

        callback('This is from server.');
        
    });

    socket.on('createLocationMessage',(coords) => {
        io.emit('newLocationMessage', );
    });

    socket.on('disconnect', () => {
        console.log('Disconnected from the Client');
    });
});

server.listen(port, () => {
    console.log('Server Started on port: '+port);
});
 