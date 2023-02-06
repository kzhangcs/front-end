(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.controller('ShoppingListShowController', ShoppingListShowController)

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

      const temp1 = this.user.menu.charAt(0);
      const temp2 = this.user.menu.charAt(1) - 1;

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

ShoppingListShowController.$inject = ['RegistrationService'];
function ShoppingListShowController(RegistrationService) {
  this.items = RegistrationService.getItems();
  this.completed = RegistrationService.getCompleted();
}


})();
