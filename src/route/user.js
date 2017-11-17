let router = require('express').Router();
let userController = require('../controller/user.controller');

router.get('/', userController.getAllUser);
router.get('/profile', userController.profile);

module.exports = router;