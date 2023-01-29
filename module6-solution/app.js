(function () {
  'use strict';
  
  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);
  
  LunchCheckController.$inject = ['$scope', '$filter'];
  function LunchCheckController($scope, $filter) {
    $scope.name = "";
    $scope.stateOfBeing = "";
    $scope.color = "";

    $scope.countItems = function () {
      if ($scope.name === "") { 
        $scope.stateOfBeing = "Please enter data first";
        $scope.color = "red";
      } else {
        const words = $scope.name.split(',').filter(s => s.trim());
        if (words.length <= 3) {
          $scope.stateOfBeing = "Enjoy";
        } else {
          $scope.stateOfBeing = "Too much!";
        }
        $scope.color = "green";
      }
    };
  }
  
  })();
  