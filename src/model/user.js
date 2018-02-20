const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
        email: {
            type: String, required: true,
            trim: true, unique: true,
            match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        },
        name: {
            type: String, required: true,
            trim: true,
        },
        facebookProvider: {
            type: {
                id: String,
                token: String
            },
            select: false
        },
        loginProvider: {
            password: {
                type: String,
                required: true
            }
        },
        history: [{
            isbn: {
                type: String,
                required: true
            },
            date: Date,
        }],

    },
    {usePushEach: true}
);


UserSchema.statics.upsertFbUser = function (accessToken, refreshToken, profile, cb) {
    return this.findOne({
        'facebookProvider.id': profile.id
    }, (err, user) => {
        // no user was found, lets create a new one
        if (!user) {
            const newUser = new this({
                email: profile.emails[0].value || 'test@localhost.dev',
                name: profile.displayName,
                facebookProvider: {
                    id: profile.id,
                    token: accessToken
                }
            });

            newUser.save(function (error, savedUser) {
                if (error) {
                    console.log(error);
                }
                return cb(error, savedUser);
            });
        } else {
            return cb(err, user);
        }
    });
};

module.exports = mongoose.model('Users', UserSchema);