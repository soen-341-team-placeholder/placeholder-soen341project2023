const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const router = express.Router();

router.post('/', async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email: req.body.email }, async (err, user) => {
        if (err) {
            res.status(400).send('message:' + err);
            console.log(err);
        } else if (user) {
            try {
                if (await bcrypt.compare(password, user.password)) {
                    const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
                    const refreshToken = jwt.sign({ email }, process.env.JWT_REFRESH_TOKEN_SECRET);
                    res.status(201).json({ acessToken: accessToken, refreshToken: refreshToken });
                } else {
                    res.status(400).send('message: Password is incorrect');
                }
            }
            catch {
                res.status(500).send('message: Server error');
            }
        } else {
            res.status(404).send('message: User not found');
        }
    });
});

module.exports = router;