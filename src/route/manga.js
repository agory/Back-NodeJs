let express = require('express');
let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('User request');
    next();
});

router.get('/', function(req, res) {
//https://www.googleapis.com/books/v1/volumes?q=978-2-7234-8852-5
    console.log();
    res.send('Birds home page hhhhh');
});

module.exports = router;