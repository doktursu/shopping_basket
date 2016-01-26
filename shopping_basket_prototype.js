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
  this.basket.total = this.basket.calculateTotal(this.basket.items);
  this.basket.total -= this.basket.calculateDiscounts(this.basket.items, 'bogof', 2, 1);
  this.basket.total -= this.basket.calculateDiscounts(this.basket.items, '3for2', 3, 1);
  this.basket.total -= this.basket.calculateOver20Discount(this.basket.total);
  this.basket.total -= this.calculateDiscountCard();
  this.basket.total = Math.round(this.basket.total * 100) / 100;
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

Basket.prototype.calculateDiscounts = function (items, discountName, buy, getFree) {
  var items = this.quantifyDiscountItems(items, discountName);
  var discounts = this.mapDiscounts(items, buy, getFree);
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

Basket.prototype.mapDiscounts = function (items, buy, getFree) {
  return Object.keys(items).map(function (itemName) {
    return Math.floor(items[itemName].quantity * getFree / buy) * items[itemName].price;
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
var cup = new Item('cup', 3, '3for2')

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


















