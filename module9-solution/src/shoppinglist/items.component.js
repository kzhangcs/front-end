(function () {
'use strict';

angular.module('ShoppingList')
.component('items', {
  templateUrl: 'src/shoppinglist/templates/item-detail-component.template.html',
  bindings: {
    items: '<'
  }
});

})();
