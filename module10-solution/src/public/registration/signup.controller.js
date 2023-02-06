(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)

SignupController.$inject = ['RegistrationService'];
function SignupController(RegistrationService) {
  RegistrationService.setCompletedFalse();

  this.submit = function() {
    console.log("here in register");
    RegistrationService.addItem(this.user);
    this.completed = true;
    RegistrationService.setCompleted();
  }

  this.upper = async function () {
    let promise2;
    let temp3;

    if (this.user?.menu) {

      const temp2 = this.user.menu.match(/\d+/);
      const temp2_index  = this.user.menu.indexOf(temp2);
      const temp1 = this.user.menu.substring(0, temp2_index);

      console.log("temp2", temp2);
      console.log("temp2_index", temp2_index);
      console.log("temp1", temp1);

      const promise =  RegistrationService.getAllCategories(temp1, temp2);

      promise2 = await promise.then(function (response) {
        if (!response) {
          temp3 = true;
        }
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    this.invalid_menu = temp3;
  };
}


})();
