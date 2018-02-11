const router = require('express').Router();
const authController = require('../controller/auth.controller');
const passport = require("passport");
const sendToken = require("../middleware/jwt").sendToken;
const generateToken = require("../middleware/jwt").generateToken;

router.post('/facebook',
    passport.authenticate('facebook-token', {session: false}),
    authController.authentificationSuccess,
    generateToken,
    sendToken);



module.exports = router;