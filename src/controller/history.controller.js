let User = require('../model/user');
let History = require('../model/history');
let History = require('../model/history');
let jwt = require('jsonwebtoken');

let HistoryController = {
    getUserHistory: async function(req, res, next) {


        // get user
        try {
            let user = await User.findOne({email: userEmail});

            if (!user) {
                return res.status(404).json({succes: false, message: "This user doesn't exists."});
            } else {
                res.status(200);
                return res.json(user.history);
            }
        } catch (err) {
            return res.status(500).json({succes: false, message: "Something went wrong.", error: err});
        }
    },
    addHistoryToUser: function () {

    },
};

module.exports = HistoryController;