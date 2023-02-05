(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.service('ShoppingListService', ShoppingListService);

SignupController.$inject = ['ShoppingListService'];
function SignupController(ShoppingListService) {
  // this.user = user;

  this.submit = function() {
    console.log("here in register");
    ShoppingListService.addItem(this.user);
  }
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
    return items;
  };
}
})();
