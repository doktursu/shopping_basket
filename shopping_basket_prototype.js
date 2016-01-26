// method helpers
function Item(name, price, discount) {
  this.name = name;
  this.price = price;
  this.discount = discount;
}


function Customer(name) {
  this.name = name;
  this.basket = new Basket;
  this.hasDiscountCard = false;
};

Customer.prototype.addItems = function () {
  for (var i = 0; i < arguments.length; i++) {
    this.basket.items.push(arguments[i]);
  };
}

Customer.prototype.resetBasket = function () {
  this.basket.items = [];
  this.basket.total = 0;
}

Customer.prototype.checkout = function () {
  var total = this.basket.total
  total = this.basket.calculateTotal(this.basket.items);
  total -= this.basket.calculateBogofDiscount(this.basket.items);
  total -= this.basket.calculateOver20Discount(total);
  total -= this.calculateDiscountCard();
}

Customer.prototype.calculateDiscountCard = function () {
  return this.hasDiscountCard ? this.basket.total * 0.05 : 0;
}



function Basket() {
  this.items = [];
  this.total = 0;
}

Basket.prototype.calculateTotal = function (items) {
  return items.reduce(function (a, b) {
    return {price: a.price + b.price};
  }).price;
}

Basket.prototype.calculateBogofDiscount = function (items) {
  var items = this.quantifyDiscountItems(items, 'bogof');
  var discounts = this.mapDiscounts(items);
  var saving = this.sumDiscounts(discounts);
  return saving;
}

Basket.prototype.quantifyDiscountItems = function (items, discount) {
  var bogofItems = {};
  this.items.forEach(function (item) {
    if (item.discount === discount) {
      if (item.name in bogofItems) {
        bogofItems[item.name].quantity++;
      } else {
        bogofItems[item.name] = {price: item.price, quantity: 1};
      }
    }
  });
  return bogofItems;
}

Basket.prototype.mapDiscounts = function (items) {
  return Object.keys(items).map(function (itemName) {
    return Math.floor(items[itemName].quantity / 2) * items[itemName].price;
  });
}

Basket.prototype.sumDiscounts = function (discounts) {
  return discounts.reduce(function (a, b) {
    return a + b;
  }, 0);
}

Basket.prototype.calculateOver20Discount = function (total) {
  return total >= 20 ? total * 0.1 : 0;
}


var chair = new Item('chair', 10, null);
var table = new Item('table', 60, null);
var spoon = new Item('spoon', 1, 'bogof');

var jay = new Customer('Jay');
var val = new Customer('Val');
val.hasDiscountCard = true;

module.exports = {
  chair: chair,
  table: table,
  spoon: spoon,
  jay: jay,
  val: val
};


















