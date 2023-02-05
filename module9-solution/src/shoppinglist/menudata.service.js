(function () {
'use strict';

angular.module('MenuApp')
.service('MenuDataService', MenuDataService);


MenuDataService.$inject = ['$q', '$timeout', '$http']
function MenuDataService($q, $timeout, $http) {
  var service = this;

  // Simulates call to server
  // Returns a promise, NOT items array directly
  service.getAllCategories = function () {
    return $http({
      method: "GET",
      url: ("https://coursera-jhu-default-rtdb.firebaseio.com/categories.json"),
    }).then(function (result) {
      console.log("result", result);
      return result.data;
  });
  };

  service.getItemsForCategory = function (categoryShortName) {
    console.log("categoryShortName", categoryShortName);
    const link = "https://coursera-jhu-default-rtdb.firebaseio.com/menu_items/" + categoryShortName + ".json";
    console.log("link", link);
    return $http({
      method: "GET",
      url: (link),
    }).then(function (result) {
      console.log("result", result);
      return result.data.menu_items;
  });
  };
}

})();
