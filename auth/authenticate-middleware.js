const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets');

const Users = require('../routes/users/user-model');

module.exports = (req, res, next) => {
    const tokenHeader = req.headers.authorization;

    if (tokenHeader) {
        jwt.verify(tokenHeader, secrets.jwtSecret, (err, decodedToken) => {
            
            if (err) {
                res.status(401).json({ message: 'error verifying token', error: err });
            } else {
                req.decodedToken = decodedToken;
                next();
            }
        });
    } else {
        res.status(401).json({ message: 'invalid scheme, or no token.' });
    }
};