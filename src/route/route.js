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

const test = (req, res, next) => {
    //console.log(req.headers);
    next()
};

router.use('/auth', auth);
router.use('/', test, authenticate, test, getCurrentUser, (error, req, res, next) => {
        if (error) {
            res.status(401).json({success: false, message: 'Auth failed', error})
        }
    }
);
router.use('/users', user);
router.use('/manga', manga);


module.exports = router;