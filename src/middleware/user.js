const User = require('../model/user');

const getCurrentUser = function(req, res, next) {
    User.findById(req.auth.id, function(err, user) {
        if (err) {
            next(err);
        } else {
            console.log(user);
            req.user = user;
            next();
        }
    });
};

module.exports.getCurrentUser = getCurrentUser;