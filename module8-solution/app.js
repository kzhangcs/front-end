(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "https://coursera-jhu-default-rtdb.firebaseio.com")
.directive('foundItems', FoundItemsDirective);

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      found: '<',
      badRemove: '=',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;

  menu.found = [];
  menu.getMatchedMenuItems = function (searchTerm) {

    var promise = MenuSearchService.getMenuForCategory(searchTerm);

    promise.then(function (response) {
      menu.found = response;
      menu.errorMessage = "";
    })
    .catch(function (error) {
      menu.errorMessage = error.message;
      menu.found = [];
    });
  };

  menu.removeItem = function (itemIndex) {
    menu.found.splice(itemIndex, 1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMenuForCategory = function (searchTerm) {
    var foundItems = [];
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
    }).then(function (result) {

      for (let key in result?.data) {
        var catagory = result?.data[key]
        for(var i = 0; i < catagory.menu_items.length; i++) {
          var description = catagory.menu_items[i].description;
          if (description.indexOf(searchTerm) !== -1) {
            var newItem = {
              name: catagory.menu_items[i].name,
              short_name: catagory.menu_items[i].short_name,
              description: catagory.menu_items[i].description,
            };
            foundItems.push(newItem);
          }
        }
      }

      if (searchTerm === "" || foundItems.length===0) {
        throw new Error ("Nothing found");
      }

      return foundItems;
  });
  };
}
})();