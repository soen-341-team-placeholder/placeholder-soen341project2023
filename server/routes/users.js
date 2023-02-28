const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const authenticateToken = require('../auth/token_validator');
const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    const email = req.query.email;

    // Get requester user type and email
    const userEmail = req.requester.email;
    const userType = req.requester.userType;
    
    // User has provided an email, thus search for a specific user with that email
    if (email != null) {

        if (userType === 'admin' || userEmail === email) {
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
            });
        }
        else {
            res.status(403).send('message: Forbidden');
        }
        return;
    }

    // User has not provided an email, thus return all users
    if (userType != 'admin') {
        res.status(403).send('message: Forbidden');
        return;
    }

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
    console.log('Creating new user');
    console.log(req.body);
    console.log(req.body.lastName);
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