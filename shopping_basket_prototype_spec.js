var chair = require('./shopping_basket_prototype').chair;
var table = require('./shopping_basket_prototype').table;
var spoon = require('./shopping_basket_prototype').spoon;
var jay = require('./shopping_basket_prototype').jay;
var val = require('./shopping_basket_prototype').val;

var assert = require('assert');

describe('Customer', function () {
  it('should be able to add an item to basket', function () {
    jay.addItems(chair);
    assert.equal(chair, jay.basket.items[0]);
  });

  it('should be able to reset basket', function () {
    jay.resetBasket();
    assert.equal(undefined, jay.basket.items[0]);
    assert.equal(0, jay.basket.total);
  });

  it('should be able to add multiple items to basket', function () {
    jay.addItems(table, spoon);
    assert.equal(table, jay.basket.items[0]);
    assert.equal(spoon, jay.basket.items[1]);
  });

  it('should be able to calculate total before discount', function () {
    jay.resetBasket();
    jay.addItems(spoon, chair)
    var total = jay.basket.calculateTotal(jay.basket.items)
    assert.equal(11, total);
  });

  it('should be able to quantify bogof items', function () {
    jay.resetBasket();
    jay.addItems(spoon, spoon, chair, table);
    var bogofItems = jay.basket.quantifyDiscountItems(jay.basket.items, 'bogof');
    assert.equal(1, bogofItems['spoon'].price);
    assert.equal(2, bogofItems['spoon'].quantity);
  });

  it('should be able to return array of bogof discounts', function () {
    jay.resetBasket();
    jay.addItems(spoon, spoon, chair, table);
    var bogofItems = jay.basket.quantifyDiscountItems(jay.basket.items, 'bogof');
    var bogofDiscounts = jay.basket.mapDiscounts(bogofItems);
    assert.equal(1, bogofDiscounts[0]);
  });

  it('should be able to total bogof discounts', function () {
    jay.resetBasket();
    jay.addItems(spoon, spoon, chair, table);
    var bogofItems = jay.basket.quantifyDiscountItems(jay.basket.items, 'bogof');
    var bogofDiscounts = jay.basket.mapDiscounts(bogofItems);
    var saving = jay.basket.sumDiscounts(bogofDiscounts);
    assert.equal(1, saving);
  });

  it('should be able to calculate bogof discounts', function () {
    jay.resetBasket();
    jay.addItems(spoon, spoon, chair, table);
    var saving = jay.basket.calculateBogofDiscounts(jay.basket.items)
    assert.equal(1, saving);
  });

  it('should be able to calculate over 20 discount', function () {
    jay.resetBasket();
    jay.addItems(chair, chair);
    jay.basket.total = jay.basket.calculateTotal(jay.basket.items);
    var saving = jay.basket.calculateOver20Discount(jay.basket.total);
    assert.equal(2, saving);
  });

  it('should be able to calculate over 20 discount, when not met', function () {
    jay.resetBasket();
    jay.addItems(chair);
    jay.basket.total = jay.basket.calculateTotal(jay.basket.items);
    var saving = jay.basket.calculateOver20Discount(jay.basket.total);
    assert.equal(0, saving);
  });

  it('should be able to calculate discount card saving, when not met', function () {
    jay.resetBasket();
    jay.addItems(chair, spoon);
    jay.basket.total = jay.basket.calculateTotal(jay.basket.items);
    var saving = jay.calculateDiscountCard(jay.basket.total);
    assert.equal(0, saving);
  });

});