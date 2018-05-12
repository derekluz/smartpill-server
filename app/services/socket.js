const io = require('socket.io-client');

module.exports = {
    sendAlert: (userId) => {
        const socket = io('http://localhost:3000');
        socket.emit('alert', userId);
    }
};
