let express = require('express');
let router = express.Router();
let mangaController = require('../controller/manga.controller');

router.use(function timeLog(req, res, next) {
    console.log('User request');
    next();
});

router.get('/:isbn', function(req, res) {
    //to test: (one piece T1) 978-2-7234-8852-5
    mangaController.getMangaByIsbnApiCall();
    res.send('Birds home page hhhhh');
});


module.exports = router;