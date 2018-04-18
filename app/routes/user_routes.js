const utils = require('../services/utils');
const ObjectID = require('mongodb').ObjectID;

module.exports = function (app, db) {

    app.put('/users/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('users')
            .update(details, req.body, (err, result) => {
                if (err) {
                    res.send({ 'error': err });
                    return;
                }
                res.send('User updated');
            });
    });


    app.post('/users', (req, res) => {
        const expectedFields = ['email', 'password'];

        if (!utils.isValidRequest(req.body, expectedFields)) {
            res.send({ 'error': 'Expected field is missing' });
            return;
        }

        const user = {
            email: req.body.email,
            password: utils.hash(req.body.password)
        };

        db.collection('users').save(user, (err, result) => {
            if (err) {
                res.send({ 'error': err });
                return;
            }
            res.send('User saved to database');
        });
    });
};