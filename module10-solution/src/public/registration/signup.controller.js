(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController)
.controller('ShoppingListShowController', ShoppingListShowController)
.service('RegistrationService', RegistrationService);

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

RegistrationService.$inject = ['$http']
function RegistrationService($http) {
  var service = this;
  var completed = false;
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

  service.setCompleted = function() {
    completed = true;
  }

  service.setCompletedFalse = function() {
    completed = false;
  }


  service.getCompleted = function() {
    console.log("here in getCompleted", this.completed)
    return completed;
  }
}
})();
