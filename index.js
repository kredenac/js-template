const express = require('express');
const app = express();
server = require('http').Server(app);
const io = require("socket.io")(server);
const { v4: uuidv4 } = require('uuid');

const roomId = 'room';
const members = [];
app.use(express.static("./public"));

app.get('/test', (req, res) => {
    // res.send({ id: uuidv4() });
});

server.listen(4000, () => {
    console.log('App listening on port 4000');
});

io.on('connection', socket => {
    socket.on('join-room', () => {
        members.push(socket);
        console.log('joined room');
        socket.join(roomId);
        const newUserId = { id: uuidv4() };
        socket.userId = newUserId;
        socket.to(roomId).broadcast.emit('user-connected', newUserId);
        socket.emit('connected-self', newUserId);
    });

    socket.on('disconnect', () => {
        const i = members.indexOf(socket);
        members.splice(i, 1);
        console.log('disconnected');
        socket.to(roomId).broadcast.emit('user-disconnected',socket.userId);
    });
});
