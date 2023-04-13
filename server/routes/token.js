const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', async (req, res) => {
    const refreshToken = req.body.refreshToken;
    const email = (await jwt.decode(refreshToken)).email;

    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN_SECRET, (err) => {
        if (err)
            return res.sendStatus(403);
        const accessToken = jwt.sign({ email }, process.env.JWT_ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
        res.json({ accessToken: accessToken });
    });
});

module.exports = router;