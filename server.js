const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const { initSocketApp } = require('./app');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

initSocketApp(io);

app.use(express.static('static'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/index.html');
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});