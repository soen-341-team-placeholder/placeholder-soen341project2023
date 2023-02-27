const express = require('express');
const bcrypt = require('bcrypt');
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
                user.password = undefined;
                res.status(200).json(user);
            } else {
                res.status(404).send('message: User not found');
            }
            return;
        });
    }

    // User has not provided an email, thus return all users
    User.find({}).then((users) => { // Find all users
        
        // Remove password from each user
        users.forEach((user) => {
            user.password = undefined;
        });
        
        res.status(200).json(users);
    }).catch((err) => {
        res.status(400).send('message:' + err);
        console.log(err);
    });
});

// Create a new user
router.post('/', async (req, res) => {
    const newUser = new User(req.body);
    newUser.password = await bcrypt.hash(newUser.password, 10);
    newUser.save((err, user) => {
        if (err) {
            res.status(400).send('message:' + err);
            console.log(err);
        } else {
            user.password = undefined;
            res.status(201).json(user);
        }
    });
});

module.exports = router;