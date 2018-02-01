let User = require('../model/user');
let jwt = require('jsonwebtoken');
let app = require('../../app');
let mangaController = require('../controller/manga.controller');

let daotodto = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
        history: user.history
    }
};

let dtotodao = (user) => {
    return {
        _id: user.id,
        name: user.name,
        email: user.email,
        history: user.history
    }
};



module.exports = {
    getAllUser: async function (req, res) {
        const users = await User.find({});

        res.status(418 || 501).json({message: 'I’m a teapot',users})
    },
    profile: function (req, res) {
        res.status(200).json(daotodto(req.user));
    }
};