let User = require('../model/user');
let jwt = require('jsonwebtoken');
let app = require('../../app');


module.exports = {
    signIn: function (req, res) {
        User.findOne({name: req.body.name}, (err, user) => {
            if (err) throw err;
            if (!user) {
                res.json({success: false, message: 'Authentication failed.'});
            } else if (user) {
                // check if password matches
                if (user.password !== req.body.password) {
                    res.json({success: false, message: 'Authentication failed.'});
                } else {
                    const payload = {
                        name: user.name,
                        email: user.email,
                    };
                    let token = jwt.sign(payload, app.get('JWTSecret'), {
                        expiresInMinutes: 1440 // expires in 24 hours
                    });

                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }

            }
        })
    },
    signUp: function (req, res) {
        let user = {};
        res.status(201).json(user);
    },
    logOut: function (req, res) {
        res.status(204).json();
    },

    getAllUser: function (req, res) {
        User.find({}, function (err, users) {
            res.json(users);
        });
    }
};