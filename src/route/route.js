let router = require('express').Router();
let authController = require('../controller/auth.controller');
let auth = require('./auth');
let book = require('./manga');
let user = require('./user');
let moment = require('moment');

const startedDate = moment().format('MMMM Do YYYY, h:mm:ss a');

router.get('/',(req,res) => res.json({
    success: true,
    startedAt: startedDate,
    message: 'Welcome to manga drein API'
}));
router.use('/auth',auth );
router.use('/',authController.middlewareVerifyToken);
router.use('/books',book);
router.use('/users',user);

module.exports = router;