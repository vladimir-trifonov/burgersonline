app.directive('skeelr.showAnimate', [function () {
    return {
        restrict: 'A',
        replace: false,
        scope: false,
        link: function(scope, element, attrs) {
            $(element).animate({"opacity": 1}, 1000);
        }
    }
}])