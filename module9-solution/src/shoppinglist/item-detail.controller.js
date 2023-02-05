(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['items']
function ItemDetailController(items) {
  console.log("here items", items)
  var mainList = this;
  mainList.items = items;
/*   var itemDetail = this;
  itemDetail.name = item.name;
  itemDetail.quantity = item.quantity;
  itemDetail.description = item.description; */
}

})();
