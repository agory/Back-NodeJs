let router = require('express').Router();
const getCurrentUser = require("../middleware/user").getCurrentUser,
    authenticate = require("../middleware/jwt").authenticate;
let auth = require('./auth');
let manga = require('./manga');
let user = require('./user');
let moment = require('moment');

const startedDate = moment().format('MMMM Do YYYY, h:mm:ss a');

router.get('/', (req, res) => res.json({
    success: true,
    startedAt: startedDate,
    message: 'Welcome to manga drein API'
}));
let index = 0;
const test = (req, res, next) => {
    console.log("test",index);
    index++;
    next()
};
router.use(test);
router.use('/auth', auth);
router.use(test);
router.use('/', authenticate, getCurrentUser);
router.use('/users', user);
router.use('/manga', manga);


module.exports = router;