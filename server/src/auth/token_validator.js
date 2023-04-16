const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, async (err) => {
        if (err) return res.status(403).send('message: Forbidden (Invalid token)');
        req.email = (await jwt.decode(token)).email.toLowerCase();
        req.requester = await User.findOne({ email: req.email });
        next();
    });
}

module.exports = authenticateToken;
