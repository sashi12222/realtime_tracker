const express = require('express');
const path = require('path');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to ejs
app.set('view engine', 'ejs');

// Set the static files directory
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', function (socket) {
    socket.on('send-location', function (data) {
        io.emit('receive-location',{id:socket.id,...data} );
    });
    socket.on('disconnect', function () {
        io.emit("user-disconnected", socket.id);
    });
    console.log('New user connected');
});

app.get('/', function (req, res) {
    res.render('index');
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
