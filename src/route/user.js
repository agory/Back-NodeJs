let router = require('express').Router();

router.use(function timeLog(req, res, next) {
    console.log('User request');
    next();
});

router.get('/', );

module.exports = router;