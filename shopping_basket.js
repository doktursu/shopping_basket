// Items

var chair = {
  name: 'chair',
  price: 10,
  discount: null
};

var table = {
  name: 'table',
  price: 60,
  discount: null
};

var spoon = {
  name: 'spoon',
  price: 1,
  discount: 'bogof'
}

// Shopping Basket

var shopping_basket = {
  total: 0,
  items: [],
  addItems: function () {
    for (var i = 0; i < arguments.length; i++) {
      this.items.push(arguments[i]);
    }
  },
  resetBasket: function () {
    this.total = 0;
    this.items = [];
  },
  checkout: function () {
    this.total = this.items.reduce(function (a, b) {
      return {price: a.price + b.price};
    }).price;
    this.total -= this.applyBogof();
    if (this.total >= 20) {
      this.total *= 0.9;
    }
  },
  applyBogof: function () {
    var bogofItems = {};
    this.items.forEach(function (item) {
      if (item.discount === 'bogof') {
        if (item.name in bogofItems) {
          bogofItems[item.name]++;
        } else {
          bogofItems[item.name] = 1;
        }
      }
    });
    var discounts = Object.keys(bogofItems).map(function (itemName) {
      
      var foundItem = this.items.find( function (item) {
        return item.name === itemName;
      });

      console.log('foundItem', foundItem);
      console.log('spoon discount', bogofItems[itemName]);
      return Math.floor(bogofItems[itemName] / 2) * foundItem.price;
    }.bind(this))

    console.log('discounts', discounts);

    var saving = discounts.reduce(function (a, b){ 
      return a + b;
    }, 0);

    console.log('discount', saving);
    return saving || 0;
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
module.exports.spoon = spoon;




//discount codes?