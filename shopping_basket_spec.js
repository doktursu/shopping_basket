var customer = require('./shopping_basket').customer;
var shopping_basket = require('./shopping_basket').shopping_basket;
var chair = require('./shopping_basket').chair;
var assert = require('assert');
    
describe('Customer', function () {
  it("should have a shopping basket", function () {
    assert.equal(shopping_basket, customer.basket)
  });
  it("should be able to add items the basket", function () {
    customer.basket.addItem(chair);
    assert.equal(chair, customer.basket.items[0]);
  });
});