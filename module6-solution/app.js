(function () {
  'use strict';
  
  angular.module('DIApp', [])
  .controller('DIController', DIController);
  
  DIController.$inject = ['$scope', '$filter'];
  function DIController($scope, $filter) {
    $scope.name = "";
    $scope.stateOfBeing = "";

    $scope.sayMessage = function () {
      return "Yaakov likes to eat healthy snacks at night!";
    };
  
    $scope.upper = function () {
      var upCase = $filter('uppercase');
      $scope.name = upCase($scope.name);
    };

    $scope.feedYaakov = function () {
      if ($scope.name === "") { 
        $scope.stateOfBeing = "Please enter data first";
      }

      const words = $scope.name.split(',');
      if (words.length <= 3) {
        $scope.stateOfBeing = "Enjoy";
      } else {
        $scope.stateOfBeing = "Too much!";
      }

    };
  }
  
  })();
  