var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

module.exports = {
    development: {
        rootPath: rootPath,
        db: 'mongodb://localhost/burgersprojectdb',
        port: process.env.PORT || 3030
    },
    production: {
        rootPath: rootPath,
        db: 'mongodb://localhost/burgersprojectdb',
        port: process.env.PORT || 3030
    },
    rootPath: rootPath
}