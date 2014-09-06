var Order = require('mongoose').model('Order');
module.exports = {
    getAllOrders: function(req, res, next) {
        Order.find({}).exec(function(err, collection) {
            if(err) {
                console.log("Orders could not be loaded: " + err);
                return next(err);
            }

            res.send(collection);
        })
    },
    addOrder: function(req, res, next) {
        var newOrderData = req.body;

        Order.create(newOrderData, function(err) {
            if(err) {
                console.log("Failed to add new order: " + err);
                return next(err);
            }

            res.send({ success: true });
        });
    },
    updateOrders: function(req, res, next) {
        var ordersData = req.body;

        ordersData.forEach(function(el) {
            Order.update({_id: el._id}, el, function(err) {
                if(err) {
                    console.log("Failed to save order: " + err);
                    return next(err);
                }
            });
        });
        res.send({ success: true });
    }
}