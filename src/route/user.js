let router = require('express').Router();
let userController = require('../controller/user.controller');
let mangaController = require('../controller/manga.controller');

router.get('/', userController.getAllUser);
router.get('/profile', userController.profile);
router.get('/history', mangaController.getMangaHistory);


module.exports = router;