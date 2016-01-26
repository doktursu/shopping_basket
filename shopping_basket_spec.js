var customer = require('./shopping_basket').customer;
var shopping_basket = require('./shopping_basket').shopping_basket;
var chair = require('./shopping_basket').chair;
var table = require('./shopping_basket').table;
var assert = require('assert');
    
describe('Customer', function () {
  it("should have a shopping basket", function () {
    assert.equal(shopping_basket, customer.basket)
  });
  it("should be able to add an item to the basket", function () {
    customer.basket.addItem(chair);
    assert.equal(chair, customer.basket.items[0]);
  });
  it("should be able reset basket", function () {
    customer.basket.resetBasket();
    assert.equal(undefined, customer.basket.items[0]);
  });
  it("should be able to add multiple items to the basket", function () {
    customer.basket.addItem(chair, table);
    assert.equal(chair, customer.basket.items[0]);
    assert.equal(table, customer.basket.items[1]);
  });
});