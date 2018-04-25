const utils = require('../services/utils');
const ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.put('/users/:id', (req, res) => {
        console.log('PUT users');
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const user = req.body;
        const expectedFields = ['email', 'password', 'schedule'];
        console.log(user)
        if (!utils.isValidRequest(user, expectedFields)) {
            res.status(400).send({ 'error': 'Expected field is missing' });
            return;
        }
        
        if (user._id) {
            delete user._id;
        }
        db.collection('users')
            .update(details, user, (err, result) => {
                if (err) {
                    res.status(500).send({ 'error': err });
                    return;
                }
                console.log(result);
                res.status(200).send('User updated');
            });
    });


    app.post('/users', (req, res) => {
        const expectedFields = ['email', 'password'];

        if (!utils.isValidRequest(req.body, expectedFields)) {
            res.status(400).send({ 'error': 'Expected field is missing' });
            return;
        }

        const schedule = req.body.schedule ? req.body.schedule : [];

        const user = {
            email: req.body.email,
            password: utils.hash(req.body.password),
            schedule: schedule
        };

        db.collection('users').save(user, (err, result) => {
            if (err) {
                res.status(500).send({ 'error': err });
                return;
            }
            res.status(200).send('User saved to database');
        });
    });
};