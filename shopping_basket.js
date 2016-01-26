var chair = {
  name: chair,
  discount: 'bogof'
};

var shopping_basket = {
  total: 0,
  items: [],
  addItem: function (item) {
    items.push(item);
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

var customer = {
  name: 'Jay',
  hasDiscountCard: true,
  basket: shopping_basket
};

console.log(customer.basket);

module.exports.customer = customer;
module.exports.shopping_basket = shopping_basket;



//discount codes?