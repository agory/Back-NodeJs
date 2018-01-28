const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

const createToken = function(auth) {
    return jwt.sign({
            id: auth.id
        }, 'my-secret',
        {
            expiresIn: 60 * 120
        });
};

const generateToken = function (req, res, next) {
    req.token = createToken(req.auth);
    next();
};

const sendToken = function (req, res) {
    res.setHeader('x-auth-token', req.token);
    res.status(200).send(req.auth);
};

const authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

module.exports.createToken = createToken;
module.exports.generateToken = generateToken;
module.exports.sendToken = sendToken;
module.exports.authenticate = authenticate;