const passport = require('passport'),
    FacebookTokenStrategy = require('passport-facebook-token'),
    User = require('../model/user');


module.exports = function () {
    passport.use(new FacebookTokenStrategy({
            clientID: '139920246702072',
            clientSecret: 'c8f8c36c2ddf683dcb19fa2ee2ea5c62',
            profileFields: ['id', 'email', 'displayName', 'photos']
        },
        function (accessToken, refreshToken, profile, done) {
            User.upsertFbUser(accessToken, refreshToken, profile, function (err, user) {
                return done(err, user);
            });
        }));
};
