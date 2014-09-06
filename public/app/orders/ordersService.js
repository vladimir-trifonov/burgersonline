app.factory("OrdersService", ["OrdersResource", "$q", "$http", function (OrdersResource, $q, $http) {
    return {
        sendOrder: function(order) {
            var deferred = $q.defer();
            var order = order;
            order.orderedAt = new Date();
            order.status = "ordered";

            order = new OrdersResource(order);
            order.$save().then(function() {
                deferred.resolve();
            }, function(response) {
                deferred.reject(response);
            });
            return deferred.promise;
        },
        updateOrders: function(orders) {
            var deferred = $q.defer();
            $http.post('/api/orders', orders).success(function(response) {
                if (response.success) {
                    deferred.resolve(true);
                } else {
                    deferred.resolve(false);
                }
            });
            return deferred.promise;
        }
    }
}])