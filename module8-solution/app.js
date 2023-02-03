(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
.directive('shoppingList', ShoppingListDirective);

function ShoppingListDirective() {
  var ddo = {
    templateUrl: 'shoppingList.html',
    scope: {
      items: '<',
      badRemove: '=',
      onRemove: '&'
    },
    controller: MenuCategoriesController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
  var menu = this;

  menu.temp1 = MenuCategoriesService.getItems();
  menu.logMenuItems = function (shortName) {
    console.log("shortName", shortName);

    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log("response", response);
      // menu.temp1 = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });

    // promise.then(function (response) {
    //   console.log(response.data);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
  };

  menu.removeItem = function (itemIndex) {
    console.log("here4");
    MenuCategoriesService.removeItem(itemIndex);
  };

}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;
  var foundItems = [];

  service.getMenuForCategory = function (shortName) {
    console.log("shortName2", shortName);
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {
      // process result and only keep items that match
      console.log("result here", result);

      for (let key in result?.data) {
        // console.log(key, result?.data[catagory]);
        var catagory = result?.data[key]
        // console.log("result?.data[catagory].menu_items.length",  catagory.menu_items.length);
        for(var i = 0; i < catagory.menu_items.length; i++) {
          // console.log("catagory.menu_items[i]", catagory.menu_items[i]);
          var description = catagory.menu_items[i].description;
          if (description.indexOf(shortName) !== -1) {
            // console.log("description", description);
            var newItem = {
              name: catagory.menu_items[i].name,
              description: catagory.menu_items[i].description,
              short_name: catagory.menu_items[i].short_name,
            };
            foundItems.push(newItem);
          }
        }
      }

      // return processed items
      return foundItems;
  });
  };

  service.removeItem = function (itemIndex) {
    console.log("here5");
    foundItems.splice(itemIndex, 1);
  };

  service.getItems = function () {
    console.log("here3");

    return foundItems;
  };
}

})();
