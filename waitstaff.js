angular.module('ngWaitstaffApp', [])
.controller('mealCtrl', function($scope) {
})
.controller('chargesCtrl', function($scope) {
    $scope.subtotal = 60;
    $scope.tip = 12;
    $scope.total = $scope.subtotal + $scope.tip;
})
.controller('earningsCtrl', function($scope) {
    $scope.tipTotal = 325;
    $scope.mealCount = 8;
    $scope.avgTPM = 16.54;
})
