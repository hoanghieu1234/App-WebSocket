const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);

const {Server} = require('socket.io');
const io = new Server(server); // tạo web socket cho server

io.on('connection', (socket) => {
    console.log('connection');

    socket.on('on-chat',(data) => { // Nhận Msg từ Client
        io.emit('user-chat',data); // Nhận data gửi lại client
    });

    socket.on('send-audio',(data) => {
        io.emit('received-audio',data); // ham nay giup client nhan data
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})

const PORT = 3000;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

server.listen(PORT, () => {
    console.log(`Server is running http://localhost:${PORT}`);
})
