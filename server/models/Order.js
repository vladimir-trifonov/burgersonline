var mongoose = require('mongoose');

var orderSchema = mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    price: String,
    orderedAt: Date,
    ingredients: [String],
    status: String
});
var Order = mongoose.model('Order', orderSchema);

module.exports = {
    removeOrders: function() {
        Order.find({}).exec(function(err, collection) {
            if (err) {
                console.log('Cannot find orders: ' + err);
            }

            Order.remove({}, function () {});
        });
    }
}