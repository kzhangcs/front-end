(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItems();

  showList.removeItem = function (itemIndex, selected) {
    try {
      ShoppingListCheckOffService.removeItem(itemIndex, selected);
    } catch (error) {
      showList.errorMessage = error.message;
    }
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var showList = this;

  showList.items = ShoppingListCheckOffService.getItems2();
  showList.errorMessage = "Nothing bought yet.";
}


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var items = [
                {name: "cookiesBrandA", quantity: "10", pricePerItem: "10"},
                {name: "cookiesBrandB", quantity: "10", pricePerItem: "20"},
                {name: "cookiesBrandC", quantity: "10", pricePerItem: "30"},
                {name: "cookiesBrandD", quantity: "10", pricePerItem: "50"},
                {name: "cookiesBrandE", quantity: "10", pricePerItem: "80"}
              ];
  var items2 = [];

  service.removeItem = function (itemIndex, num_selected) {
    var temp1 = items[itemIndex];
    if (num_selected > temp1.quantity) {
      throw new Error("Quantity exceeded.");
    }

    items.splice(itemIndex, 1);
    temp1.selected = num_selected;
    items2.push(temp1);

    if (items.length === 0) {
      throw new Error("Everything is bought!");
    }
  };

  service.getItems = function () {
    return items;
  };

  service.getItems2 = function () {
    return items2;
  };

}

})();
