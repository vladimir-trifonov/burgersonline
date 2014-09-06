var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session);
    passport = require('passport');

module.exports = function(app, config) {
    app.set('view engine', 'jade');
    app.set('views', config.rootPath + '/server/views');
    app.use(cookieParser());
    app.use(bodyParser());
    //app.use(session({secret: 'gergenymntyuy45by4ERGH#qa45v'}));
    app.use(session({
        store: new MongoStore({
            url: config.db
        }),
        secret: 'gergenymntyuy45by4ERGH#qa45v',
        cookie: {
            secure: false,
            maxAge: 86400000
        },
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(config.rootPath + '/public'));
}