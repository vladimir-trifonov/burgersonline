app.directive('skeelr.orderForm', ["OrdersService", "notifier", "$location", function (OrdersService, notifier, $location) {
    return {
        restrict: 'A',
        replace: false,
        scope: true,
        templateUrl: "/tpl/orders/order-form.html",
        controller: function($scope) {
            $scope.model = {};
            $scope.model.ingredients = [];
            $scope.model.price = 0;
        },
        link: function(scope, element, attrs) {
            element.on("click", ".list-choice .list-choice-item", function(){
                var $el = $(this);
                var ingredient = $el.data("val");

                var $item = $("<li>" + ingredient["name"] + "</li>").data("price", ingredient["price"]);

                scope.$apply(function(){
                    scope.model.price = Math.round((scope.model.price + ingredient["price"]) * 100) / 100;
                });
                scope.model.ingredients.push(ingredient["name"]);

                $item.on("click", function() {
                    var $el = $(this);
                    var ingredientName = $el.text();

                    var item = element.find(".list-choice li[data-val*=" + $el.text() + "]");
                    item.css("display", "");

                    scope.$apply(function(){
                        scope.model.price = Math.round((scope.model.price - $el.data("price")) * 100) / 100;
                    });
                    scope.model.ingredients.splice(scope.model.ingredients.indexOf(ingredientName), 1);

                    $el.remove();
                });

                element
                    .find(".list-selected")
                    .append($item);

                $el.css("display", "none");
            });

            element.on("submit", function(e) {
                e.preventDefault();
                OrdersService.sendOrder(scope.model).then(function() {
                    scope.model.price = 0;
                    scope.model.ingredients = [];
                    element.find(".list-choice li").css("display", "");
                    element.find(".list-selected").html("");

                    notifier.success('Order added successfully!');
                }, function(response) {
                    notifier.error('Service Error!');
                });
            });
        }
    }
}]);