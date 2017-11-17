let User = require('../model/user');
let jwt = require('jsonwebtoken');
let app = require('../../app');

let daotodto = (user) => {
    return {
        id: user._id,
        name: user.name,
        email: user.email,
    }
}

let dtotodao = (user) => {
    return {
        _id: user.id,
        name: user.name,
        email: user.email,
    }
}



module.exports = {
    getAllUser: function (req, res) {
        res.status(418 || 501).json({message: 'I’m a teapot'})
    },
    profile: function (req, res) {
        res.status(200).json(daotodto(req.user));
    }
};