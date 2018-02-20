const User = require('../model/user');
const  bcrypt = require('bcryptjs');
module.exports = {
    authentificationSuccess: (req, res, next) => {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        //console.log(req.user);

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        next();
    },
    authentificationDirect: async (req, res, next) => {
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password) {
            return res.send(400, {
                success: false,
                error: {
                    message: "must have a field password and email",
                }
            });
        }
        try {
            const user = await User.findOne({email:email});
            if(!user){
                return res.send(401, {
                    success: false,
                    error: {
                        message: "Bad credential",
                    }
                });
            }
            req.user = user;
            req.auth = {
                id: req.user.id
            };
            next();

        } catch (error) {
            return res.send(400, {
                success: false,
                error
            });
        }
    }

    register: async () => {
        const email = req.body.email;
        const password = req.body.password;
        if(!email || !password) {
            return res.send(400, {
                success: false,
                error: {
                    message: "must have a field password and email",
                }
            });
        }
        try {
            const user = await User.findOne({email:email});
            if(user) {
                res.send(400, {
                    success: false,
                    error: {
                        message: "email already used",
                    }
                });
            }
            const user = new User();
            user.email = email;
            user.name = email.split('@')[0];
            user.loginProvider.passport = await bcrypt.hash(myPlaintextPassword, await bcrypt.genSalt(saltRounds));
            await user.save();
            res.send(200)
        } catch (error) {
            return res.send(400, {
                success: false,
                error
            });
        }

    }


};