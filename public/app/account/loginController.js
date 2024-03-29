app.controller('LoginController', function($scope, $http, $location, notifier, identity, auth) {
    $scope.identity = identity;

    $scope.login = function(user) {
        auth.login(user).then(function(success) {
            if (success) {
                $location.path('/operator/orders').replace();
                notifier.success('Successful login!');
            } else {
                notifier.error('Username/Password combination is not valid!')
            }
        });
    }

    $scope.logout = function() {
        auth.logout().then(function() {
            notifier.success('Successful logout!');
            if($scope.user) {
                $scope.user.username = '';
                $scope.user.password = '';
            }

            $location.path('/');
        });
    }
});