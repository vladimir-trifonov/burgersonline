var mongoose = require('mongoose'),
    encryption = require('../utilities/encryption');

var userSchema = mongoose.Schema({
    username: { type: String, require: '{PATH} is required', unique: true},
    firstName: { type: String, require: '{PATH} is required'},
    lastName: { type: String, require: '{PATH} is required'},
    salt: String,
    hashPass: String,
    roles: [String]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports = {
    seedInitialUsers: function() {
        User.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find users: ' + err);
            }

            //User.remove({}, function () {
            if (collection.length === 0) {
                var salt = null,
                    hashedPassword = null;

                salt = encryption.generateSalt();
                hashedPassword = encryption.generateHashedPassword(salt, 'operator');
                User.create({
                    username: 'operator',
                    firstName: 'Default',
                    lastName: 'Operator',
                    salt: salt,
                    hashPass: hashedPassword,
                    roles: ['operator']
                });
                console.log("Users added to db!");
            }
            //});
        });
    }
}