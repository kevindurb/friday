const express = require('express');
const socket = require('socket.io');
const { Server } = require('http');

const app = express();

app.use('/', express.static('public'))

const server = Server(app);

const io = socket(server);

io.on('connection', () => console.log('socket io connection'));

server.listen(8888, () => console.log('listening'));
