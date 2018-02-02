let express = require('express');
let router = express.Router();
let mangaController = require('../controller/manga.controller');

router.use(function timeLog(req, res, next) {
    console.log('User request');
    next();
});

//to test: (one piece T1) 978-2-7234-8852-5
router.get('/:isbn', mangaController.getMangaByIsbnApiCall);
router.get('/chapters/:isbn', mangaController.getMangaChaptersApiCall);


module.exports = router;