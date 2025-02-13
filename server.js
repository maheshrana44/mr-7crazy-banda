const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware for serving static files (HTML, CSS, JS)
app.use(express.static('public'));

// Socket.IO Events
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle when a user logs in
    socket.on('userLoggedIn', (userData) => {
        console.log('User Logged In:', userData);
    });

    // Handle movie play/pause synchronization
    socket.on('syncMovie', (data) => {
        socket.broadcast.emit('syncMovie', data);  // Broadcast to all other users
    });

    // Handle voice chat
    socket.on('startVoiceChat', (userInfo) => {
        console.log('Voice chat started by', userInfo);
        // Add WebRTC signaling logic here if necessary
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
