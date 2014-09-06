app.controller('OrdersListController', ["$scope", "OrdersService", "OrdersResource", "notifier", function($scope, OrdersService, OrdersResource, notifier) {
    $scope.orders = OrdersResource.query();

    $scope.update = function (orders) {
        OrdersService.updateOrders(orders).then(function() {
            notifier.success('Orders Statuses Updated!');
        }, function() {
            notifier.error('Orders Statuses Not Updated!');
        });
    }
}]);