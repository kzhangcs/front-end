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

  showList.removeItem = function (itemIndex, selected) {
    try {
      ShoppingListService.removeItem(itemIndex, selected);
    } catch (error) {
      showList.errorMessage = error.message;
    }
  };
}

ShoppingListShowController2.$inject = ['ShoppingListService'];
function ShoppingListShowController2(ShoppingListService) {
  var showList = this;

  showList.items = ShoppingListService.getItems2();
  showList.errorMessage = "Nothing bought yet.";
}


function ShoppingListService() {
  var service = this;

  // List of shopping items
  var items = [
                {name: "cookie1", quantity: "10", price: "10"}, 
                {name: "cookie2", quantity: "10", price: "20"}, 
                {name: "cookie3", quantity: "10", price: "30"},
                {name: "cookie4", quantity: "10", price: "50"},
                {name: "cookie5", quantity: "10", price: "80"}
              ];
  var items2 = [];

  // service.addItem = function (itemName, quantity, price) {
  //   var item = {
  //     name: itemName,
  //     quantity: quantity
  //   };
  //   items.push(item);
  // };

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
