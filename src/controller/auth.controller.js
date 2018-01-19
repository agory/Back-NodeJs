let User = require('../model/user');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
let config = require('../../config.dev');


let buildToken = user => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
    };
    return jwt.sign(payload, config.secret, {expiresIn: 60 * 60 * 24 * 365});
};


module.exports = {
    signIn: async function (req, res) {
        try {
            let user = await User.findOne({email: req.body.email});

            if (!user) {
                res.status(400).json({success: false, message: 'Authentication failed.'});
            } else if (user) {
                let verify = await bcrypt.compare(req.body.password, user.password);
                if (!verify) {
                    res.status(400).json({success: false, message: 'Authentication failed.'});
                } else {
                    res.status(200).json({
                        success: true,
                        token: buildToken(user)
                    });
                }
            }
        } catch (err) {
            res.status(500).json({succes: false, message: "Something went wrong.", error: err});
        }
    },
    signUp: async function (req, res) {
        try {
            let user = await User.findOne({email: req.body.email});

            if (user) {
                return res.status(403).json({succes: false, message: "The email is already used."});
            }
        } catch (err) {
            return res.status(500).json({succes: false, message: "Something went wrong.", error: err});
        }

        let password = await bcrypt.hash(req.body.password, await bcrypt.genSalt(10));

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            password: password,
        });

        try {
            let userSave = await user.save();

            res.status(201).json({
                success: true,
                token: buildToken(userSave)
            });
        } catch (err) {
            return res.status(400).json({succes: false, message: "Something went wrong.", error: err});
        }


    },
    middlewareVerifyToken: async function (req, res, next) {
        let token = req.body.token || req.query.token || req.headers['manga-drein-access-token'];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'No token provided.'
            });
        }
        try {
            let decoded = await jwt.verify(token, config.secret);
            req.user = await User.findOne({_id: decoded.id}).populate('history');
            next();
        } catch (err) {
            return res.status(401).json({success: false, message: 'Failed to authenticate token.'});
        }
    }
};