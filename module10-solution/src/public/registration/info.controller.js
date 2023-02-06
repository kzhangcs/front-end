(function () {
"use strict";

angular.module('public')
.controller('ShoppingListShowController', ShoppingListShowController);

ShoppingListShowController.$inject = ['RegistrationService'];
function ShoppingListShowController(RegistrationService) {
    this.items = RegistrationService.getItems();
    this.completed = RegistrationService.getCompleted();
}

})();