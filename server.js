/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');

const app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 
                'POST, GET, PUT, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", 
                "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

MongoClient.connect(db.url, (err, client) => {
    if (err) return console.log(err);
    const database = client.db('smartpill');
    require('./app/routes')(app, database);

    io.on('connection', (socket) => {
        console.log('a user connected');
        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
        socket.on('join-room', (userId) => {
            console.log('Joining room for userId: ' + userId);
            socket.join(userId);
        });
        socket.on('alert', (userId) => {
            console.log('Sending Alert for userId: ' + userId);
            socket.broadcast.to(userId).emit('alert');
        });
    });

    http.listen(3000, () => {
        console.log('listening on 3000');
    });

});
