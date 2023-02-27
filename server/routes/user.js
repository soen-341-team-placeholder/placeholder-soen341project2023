const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.get('/', (req, res, next) => {
    const email = req.query.email;

    // User has provided an email, thus search for a specific user with that email
    if (email != null) {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                res.status(400).send('message:' + err);
                console.log(err);
            } else if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).send('message: User not found');
            }
            return;
        });
    }

    // User has not provided an email, thus return all users
    // Find all users
    User.find({}).then((users) => {
        res.status(200).json(users);
    }).catch((err) => {
        res.status(400).send('message:' + err);
        console.log(err);
    });
});

router.post('/', (req, res) => {
    const newUser = new User(req.body);
    newUser.save((err, user) => {
        if (err) {
            res.status(400).send('message:' + err);
            console.log(err);
        } else {
            res.status(200).json(user);
        }
    });
});

module.exports = router;