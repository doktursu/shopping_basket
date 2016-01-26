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

  it('should be able to add multiple items to basket', function () {
    jay.addItems(table, spoon);
    assert.equal(table, jay.basket.items[1]);
    assert.equal(spoon, jay.basket.items[2]);
  });
});