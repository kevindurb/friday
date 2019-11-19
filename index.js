const express = require('express');
const socket = require('socket.io');
const { Server } = require('http');
const modules = require('./modules');
const Friday = require('./Friday');

const friday = new Friday();
modules.forEach((Mod) => {
  const mod = new Mod(friday);
  friday.register(mod);
});

const app = express();

app.use('/', express.static('public'))

const server = Server(app);

const io = socket(server);

io.on('connection', (connection) => {
  connection.on('message', async (value) => {
    const response = await friday.respond(value);

    if (response) {
      connection.emit('message', response);
    }
  });
});

server.listen(8888, () => console.log('listening http://localhost:8888/'));
