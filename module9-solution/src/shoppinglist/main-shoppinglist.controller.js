(function () {
'use strict';

angular.module('ShoppingList')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['categories'];
function MainShoppingListController(categories) {
  this.categories = categories;
}

})();
