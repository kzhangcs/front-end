(function () {
'use strict';

angular.module('MenuApp')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['categories'];
function MainShoppingListController(categories) {
  this.categories = categories;
}

})();
