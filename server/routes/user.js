const express = require('express');
const User = require('../models/User');
const router = express.Router();

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