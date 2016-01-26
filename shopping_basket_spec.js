var customer = require('./shopping_basket').customer;
var shopping_basket = require('./shopping_basket').shopping_basket;
var assert = require('assert');
    
describe('Customer', function () {
  it("should have a shopping basket", function () {
    assert.equal(shopping_basket, customer.basket)
  });
});