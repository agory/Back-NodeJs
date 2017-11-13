let express = require('express');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('User request');
    next();
});

router.get('/', function(req, res) {
    res.send('Birds home page');
});

module.exports = router;