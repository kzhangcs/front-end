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

ShoppingListService.$inject = ['$http']
function ShoppingListService($http) {
  var service = this;
  console.log("here in service");
  // List of shopping items
  var items = [];
  console.log("items", items)

  service.addItem = function (user) {
    console.log("here in addItem: user", user)
    console.log("here in addItem: user.menu", user.menu)
    const temp1 = user.menu.charAt(0);
    const temp2 = user.menu.charAt(1) - 1;
    user.temp1 = temp1;
    user.temp2 = temp2 + 1;
    
    console.log("here in addItem: temp1", temp1);
    console.log("here in addItem: temp2", temp2);

    const promise =  this.getAllCategories(temp1, temp2);
    console.log("here in addItem: promise", promise);

    promise.then(function (response) {
      console.log("here in promise, response", response);
      user.menu_saved = response;
    })
    .catch(function (error) {
    });
    console.log("here in addItem: user", user)
    items.push(user);
  };

  service.getAllCategories = function (temp1, temp2) {
    return $http({
      method: "GET",
      url: ("https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + temp1 + "/menu_items/" + temp2 + ".json"),
    }).then(function (result) {
      return result.data;
  });
  };

  service.getItems = function () {
    console.log("here in getItems", items)
    return items?.[0];
  };
}
})();
