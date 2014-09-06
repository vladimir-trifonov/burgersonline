var User = require('mongoose').model('User');
encryption = require('../utilities/encryption');

module.exports = {
    createUser: function(req, res, next) {
        res.status(501);
        return res.send({reason: 'Not Implemented!'});
    },
    updateUser: function(req, res, next) {
        res.status(501);
        return res.send({reason: 'Not Implemented!'});
    }
}