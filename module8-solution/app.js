(function () {
'use strict';

angular.module('MenuCategoriesApp', [])
.controller('MenuCategoriesController', MenuCategoriesController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com");


MenuCategoriesController.$inject = ['MenuCategoriesService'];
function MenuCategoriesController(MenuCategoriesService) {
  var menu = this;

  menu.logMenuItems = function (shortName) {
    console.log("shortName", shortName);

    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log("response", response);
      menu.temp1 = response;
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });
  };

}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMenuForCategory = function (shortName) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {
      // process result and only keep items that match
      var foundItems = [];

      for (let key in result?.data) {
        var catagory = result?.data[key]
        for(var i = 0; i < catagory.menu_items.length; i++) {
          var description = catagory.menu_items[i].description;
          if (description.indexOf(shortName) !== -1) {
            console.log("description", description);
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

}

})();
