(function () {
'use strict';

angular.module('ShoppingListApp', [])
.controller('ShoppingListAddController', ShoppingListAddController)
.controller('ShoppingListShowController', ShoppingListShowController)
.controller('ShoppingListShowController2', ShoppingListShowController2)
.service('ShoppingListService', ShoppingListService);

ShoppingListAddController.$inject = ['ShoppingListService'];
function ShoppingListAddController(ShoppingListService) {
  var itemAdder = this;

  itemAdder.itemName = "";
  itemAdder.itemQuantity = "";

  itemAdder.addItem = function () {
    ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
  }
}


ShoppingListShowController.$inject = ['ShoppingListService'];
function ShoppingListShowController(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems();

  showList.removeItem = function (itemIndex) {
    ShoppingListService.removeItem(itemIndex);
  };
}

ShoppingListShowController2.$inject = ['ShoppingListService'];
function ShoppingListShowController2(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems2();

}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [{name: "cookies", quantity: "10"}, {name: "cookies", quantity: "10"}]; 
  var items2 = [{name: "cookies", quantity: "10"}]; 

  service.addItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    items.push(item);
  };

  service.removeItem = function (itemIndex) {
    var temp1 = items[itemIndex];
    items.splice(itemIndex, 1);
    items2.push(temp1);
  };

  service.getItems = function () {
    return items;
  };

  service.getItems2 = function () {
    return items2;
  };
}

})();
