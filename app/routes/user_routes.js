const utils = require('../services/utils');

module.exports = function (app, db) {
    app.get('/users', (req, res) => {
        db.collection('users').find().toArray((err, result) => {
            if (err) return console.log(err);
            console.log('Get result: ', result);
        });
    });

    // app.put('/quotes', (req, res) => {
    //     db.collection('quotes')
    //         .findOneAndUpdate({ name: 'Yoda' }, {
    //             $set: {
    //                 name: req.body.name,
    //                 quote: req.body.quote
    //             }
    //         }, {
    //                 sort: { _id: -1 },
    //                 upsert: true
    //             }, (err, result) => {
    //                 if (err) return res.send(err);
    //                 res.send(result);
    //             });
    // });

    // app.delete('/quotes', (req, res) => {
    //     db.collection('quotes').findOneAndDelete({ name: req.body.name },
    //         (err, result) => {
    //             if (err) return res.send(500, err);
    //             res.send({ message: 'A darth vader quote got deleted' });
    //         });
    // });


    app.post('/users', (req, res) => {
        const expectedFields = ['email', 'password'];

        if(!utils.isValidRequest(req.body, expectedFields)) {
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