var auth = require('./auth'),
    controllers = require('../controllers');

module.exports = function(app) {
    app.get('/api/orders', auth.isAuthenticated, controllers.orders.getAllOrders);
    app.put('/api/orders', controllers.orders.addOrder);
    app.post('/api/orders', controllers.orders.updateOrders);

    app.get('/partials/:partialArea/:partialName', function(req, res) {
        res.render('../../public/app/' + req.params.partialArea + '/' + req.params.partialName);
    });
    app.get('/tpl/:tplArea/:tplName', function(req, res) {
        res.sendFile(req.params.tplName, {'root': 'public/app/' + req.params.tplArea});
    });

    app.post('/login', auth.login);
    app.post('/logout', auth.logout);

    app.get('/api/*', function(req, res) {
        res.status(404);
        res.end();
    });

    app.get('*', function(req, res) {
        res.render('index', {currentUser: req.user});
    });
};