(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('ShoppingListService', ShoppingListService);

SignupController.$inject = ['ShoppingListService'];
function SignupController(ShoppingListService) {
  this.submit = function() {
    console.log("here in register");
    ShoppingListService.addItem(this.user);
  }
}

ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService) {
  this.items = ShoppingListService.getItems();
}

function ShoppingListService() {
  var service = this;
  console.log("here in service");
  // List of shopping items
  var items = [];
  console.log("items", items)

  service.addItem = function (user) {
    console.log("here in addItem: user", user)
    items.push(user);
  };

  service.getItems = function () {
    console.log("here in getItems", items)
    return items?.[0];
  };
}
})();
