const ObjectID = require('mongodb').ObjectID;
const utils = require('../services/utils');

module.exports = function (app, db) {
    app.post('/dispenser/:id/alert', (req, res) => {
        console.log('POST Dispenser Alert');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = req.body;
        
        db.collection('users').findOne(user, (err, result) => {
            if (err) {
                res.json({ 'error': err });
                return;
            }
            if (!result) {
                res.status(401).json({ 'error': 'Invalid request' });
                return;
            }
            res.json(result);
        });
    });

    app.get('/dispenser/:id', (req, res) => {
        console.log('GET Dispenser');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = req.body;
        
        db.collection('users').findOne(user, (err, result) => {
            if (err) {
                res.json({ 'error': err });
                return;
            }
            if (!result) {
                res.status(401).json({ 'error': 'Invalid request' });
                return;
            }
            const formattedData = utils.formatDispenserData(result.schedule);
            res.json(formattedData);
        });
    });
};