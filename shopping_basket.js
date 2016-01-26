// Items

var chair = {
  name: 'chair',
  discount: 'bogof'
};

var table = {
  name: 'table',
  discount: 'bogof'
};

// Shopping Basket

var shopping_basket = {
  total: 0,
  items: [],
  addItem: function (item) {
    this.items.push(item);
  },
  checkout: function () {
    this.applydiscount();
  },
  applyDiscounts: function () {
    this.applyBogof();
  },
  applyBogof: function () {
    var bogofItems = items.filter(function (item) {
      return item.discount === 'bogof';
    });
  }
};

// Customer

var customer = {
  name: 'Jay',
  hasDiscountCard: true,
  basket: shopping_basket
};

console.log(customer.basket);

module.exports.customer = customer;
module.exports.shopping_basket = shopping_basket;
module.exports.chair = chair;




//discount codes?