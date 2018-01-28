const router = require('express').Router();
const authController = require('../controller/auth.controller');
const passport = require("passport");
const sendToken = require("../middleware/jwt").sendToken;
const generateToken = require("../middleware/jwt").generateToken;

const console = (req,res,next) => {
    console.log('ok');
    next();
};

router.post('/facebook',
    console,
    passport.authenticate('facebook-token', {session: false}),
    console,
    authController.authentificationSuccess,
    console,
    generateToken,
    console,
    sendToken,
    console,
    (error, req, res, next) => {
        if(error) {
            res.status(400).json({success: false, message: 'Auth failed', error})
        }
});



module.exports = router;