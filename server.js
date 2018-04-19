/*jshint esversion: 6 */
const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

MongoClient.connect(db.url, (err, client) => {
    if (err) return console.log(err);
    const database = client.db('smartpill');
    require('./app/routes')(app, database);
    app.listen(3000, () => {
        console.log('listening on 3000');
    });
});
