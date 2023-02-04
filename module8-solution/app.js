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

  // menu.found = MenuSearchService.getItems();
  menu.found = [];
  menu.getMatchedMenuItems = function (searchTerm) {
    console.log("searchTerm", searchTerm);

    var promise = MenuSearchService.getMenuForCategory(searchTerm);

    promise.then(function (response) {
      console.log("response", response);
      menu.found = response;
      menu.errorMessage = "";
    })
    .catch(function (error) {
      menu.errorMessage = error.message;
      menu.found = [];
      console.log("error.message", error.message);
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
    menu.found.splice(itemIndex, 1);
  };

}


MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMenuForCategory = function (searchTerm) {
    var foundItems = [];
    console.log("searchTerm2", searchTerm);
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
          if (description.indexOf(searchTerm) !== -1) {
            // console.log("description", description);
            var newItem = {
              name: catagory.menu_items[i].name,
              short_name: catagory.menu_items[i].short_name,
              description: catagory.menu_items[i].description,
            };
            foundItems.push(newItem);
          }
        }
      }

      if (foundItems.length===0) {
        throw new Error ("Nothing found");
      }
      // return processed items
      return foundItems;
  });
  };
}
})();