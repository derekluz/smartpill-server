const ObjectID = require('mongodb').ObjectID;
const utils = require('../services/utils');
const socketService = require('../services/socket');

module.exports = (app, db) => {
    app.post('/dispenser/:id/alert', (req, res) => {
        const id = req.params.id;
        console.log('POST Dispenser Alert for:', id);
        const details = { '_id': new ObjectID(id) };

        db.collection('users').findOne(details, (err, result) => {
            if (err) {
                res.status(500).json({ 'error': err });
                return;
            }
            if (!result) {
                res.status(401).json({ 'error': 'Invalid request' });
                return;
            }
            socketService.sendAlert(id);
            res.status(200).json('Alert sent!');
        });
    });

    app.get('/dispenser/:id', (req, res) => {
        console.log('GET Dispenser');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };

        db.collection('users').findOne(details, (err, result) => {
            if (err) {
                res.json({ 'error': err });
                return;
            }
            if (!result) {
                res.status(401).json({ 'error': 'Invalid request' });
                return;
            }
            const pillsForCurrentMinute = utils.getPillsForCurrentMinute(result.schedule);
            res.json(pillsForCurrentMinute);
        });
    });
};