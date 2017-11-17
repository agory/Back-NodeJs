module.exports = {
    signIn: function (req, res) {
        let user = {};
        res.status(200).json(user);
    },
    signUp: function (req, res) {
        let user = {};
        res.status(201).json(user);
    },
    logOut: function (req, res) {
        res.status(204).json();
    },
};