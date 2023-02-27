const jwt = require('jsonwebtoken');

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET, (err) => {
        if (err) return res.sendStatus(403);
        req.email = jwt.decode(token).email;
        next();
    });

}

module.exports = authenticateToken;
