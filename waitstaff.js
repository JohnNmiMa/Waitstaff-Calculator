angular.module('ngWaitstaffApp', [])
.constant('DEFAULT_TAX_RATE', 7.35)

.controller('waitstaffCtrl', function($scope) {
    $scope.$on('updateChargesAndEarnings', function(event,data) {
        console.log("In updateChargesAndEarnings: data = " + data);
        $scope.$broadcast('updateCharges', data);
        $scope.$broadcast('updateEarnings', data);
    });
    $scope.resetCalc = function() {
        $scope.$broadcast('resetCtrl', true);
    }
})

.controller('mealFormCtrl', function($scope, DEFAULT_TAX_RATE) {
    $scope.data = {bmp: null, taxRate:DEFAULT_TAX_RATE, tipPcnt:null};
    $scope.submitted = false;
    $scope.error = 'none';
    $scope.submit = function() {
        if($scope.mealForm.$valid) {
            $scope.$emit('updateChargesAndEarnings', $scope.data);
            $scope.resetForm();
            $scope.submitted = false;
        } else {
            if ($scope.mealForm.$error.required) {
                $scope.error = 'required';
                console.log('The Form is not completely filled in');
            } 
            if ($scope.mealForm.$error.number) {
                $scope.error = 'number';
                console.log('The Form must contain numbers');
            }
            $scope.submitted = true;
        }
    }
    $scope.resetForm = function() {
        $scope.data.bmp = $scope.data.tipPcnt = null;
        $scope.mealForm.$setPristine();
        $scope.error = 'none';
        $('#bmp').focus();
    }
    $scope.$on('resetCtrl', function(event, data) {
        $scope.resetForm();
    });
})

.controller('chargesCtrl', function($scope) {
    $scope.subtotal = $scope.tip = $scope.total = null;
    $scope.$on('updateCharges', function(event, data) {
        $scope.subtotal = data['bmp'] + (data['bmp'] * data['taxRate']/100);
        $scope.tip = data['bmp'] * data['tipPcnt']/100;
        $scope.total = $scope.subtotal + $scope.tip;
    });
    $scope.$on('resetCtrl', function(event, data) {
        $scope.subtotal = $scope.tip = $scope.total = null;
    });
})

.controller('earningsCtrl', function($scope, $rootScope) {
    $scope.tipTotal = $scope.avgTPM = null;
    $scope.mealCount = 0;
    $scope.$on('updateEarnings', function(event, data) {
        $scope.tipTotal += data['bmp'] * data['tipPcnt']/100;
        $scope.mealCount += 1;
        $scope.avgTPM = $scope.tipTotal / $scope.mealCount;
    });
    $scope.$on('resetCtrl', function(event, data) {
        $scope.tipTotal = $scope.avgTPM = null;
        $scope.mealCount = 0;
    });
})
