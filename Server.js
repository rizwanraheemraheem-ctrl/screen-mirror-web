const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });

// Root route
app.get('/', (req, res) => {
    res.send('Server is Running...');
});

io.on('connection', (socket) => {
    console.log('Device connected: ' + socket.id);

    // Mobile app se data lena aur website ko bhejna
    socket.on('screen-data', (data) => {
        socket.broadcast.emit('screen-data', data);
    });

    socket.on('disconnect', () => {
        console.log('Device disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server started on port ' + PORT);
});
