(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['menuCategories'];
function SignupController() {
  // this.user = user;

  this.submit = function() {
    console.log("here in register");
  }
}


})();
