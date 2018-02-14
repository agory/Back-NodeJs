
module.exports = {
    authentificationSuccess: function (req, res, next) {
        if (!req.user) {
            return res.send(401, 'User Not Authenticated');
        }
        //console.log(req.user);

        // prepare token for API
        req.auth = {
            id: req.user.id
        };

        next();
    }
};