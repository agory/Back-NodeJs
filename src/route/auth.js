let router = require('express').Router();
let authController = require('../controller/auth.controller');

router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);

module.exports = router;