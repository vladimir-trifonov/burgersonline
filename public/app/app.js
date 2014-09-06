var app = angular.module('app', ['ngResource', 'ngRoute'])

app.value('toastr', toastr);
app.config(["$routeProvider", function($routeProvider) {

    var routeUserChecks = {
        operatorRole: {
            authenticate: function(auth) {
                return auth.isAuthorizedForRole('operator');
            }
        },
        authenticate: {
            authenticate: function(auth) {
                return auth.isAuthenticated();
            }
        }
    };

    $routeProvider
        .when('/', {
            templateUrl: '/partials/main/home',
            controller: 'MainController'
        })
        .when('/order', {
            templateUrl: '/partials/orders/order',
            controller: 'OrderController'
        })
        .when('/login', {
            templateUrl: '/partials/account/login',
            controller: 'LoginController'
        })
        .when('/operator/orders', {
            templateUrl: 'partials/operator/orders-list',
            controller: 'OrdersListController',
            resolve: routeUserChecks.operatorRole
        })
        .otherwise({
            redirectTo: '/'
        });
}]);

app.run(function($rootScope, $location) {
    $rootScope.$on('routeChangeError', function(event, current, previous, rejection) {
        if(rejection === "not authorized") {
            $location.path('/');
        }
    })
})