let express = require('express');
let router = express.Router();
let historyController = require('../controller/history.controller');

router.use(function timeLog(req, res, next) {
    console.log('User request');
    next();
});

// get the user's history
router.get('/:email', historyController.getUserHistory);


module.exports = router;