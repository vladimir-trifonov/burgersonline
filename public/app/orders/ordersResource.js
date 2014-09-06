app.factory('OrdersResource', ["$resource", function($resource) {
    var OrdersResource = $resource('/api/orders/:id', {_id: '@id'}, {save: {method: 'PUT', isArray: false}, update: {method: 'POST', isArray: true}});
    return OrdersResource;
}]);