// Items

var chair = {
  name: 'chair',
  price: 20,
  discount: 'bogof'
};

var table = {
  name: 'table',
  price: 60,
  discount: 'bogof'
};

// Shopping Basket

var shopping_basket = {
  total: 0,
  items: [],
  addItem: function () {
    for (var i = 0; i < arguments.length; i++) {
      this.items.push(arguments[i]);
    }
  },
  resetBasket: function () {
    this.total = 0;
    this.items = [];
  },
  checkout: function () {
    //this.applydiscount();
    this.total = this.items.reduce(function (a, b) {
      return {price: a.price + b.price};
    }).price;
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
module.exports.table = table;




//discount codes?