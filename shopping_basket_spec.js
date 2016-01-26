var customer = require('./shopping_basket').customer;
var shopping_basket = require('./shopping_basket').shopping_basket;
var chair = require('./shopping_basket').chair;
var table = require('./shopping_basket').table;
var spoon = require('./shopping_basket').spoon;
var customer_with_saving = require('./shopping_basket').customer_with_saving;
var assert = require('assert');
    
describe('Customer', function () {
  it('should have a shopping basket', function () {
    assert.equal(shopping_basket, customer.basket)
  });
  it('should be able to add an item to the basket', function () {
    customer.basket.addItems(chair);
    assert.equal(chair, customer.basket.items[0]);
  });
  it('should be able reset basket', function () {
    customer.basket.resetBasket();
    assert.equal(undefined, customer.basket.items[0]);
  });
  it('should be able to add multiple items to the basket', function () {
    customer.basket.addItems(chair, table);
    assert.equal(chair, customer.basket.items[0]);
    assert.equal(table, customer.basket.items[1]);
  });
  it('should be able to checkout and have total', function () {
    customer.basket.resetBasket();
    customer.basket.addItems(chair);
    customer.basket.checkout();
    assert.equal(10, customer.basket.total)
  });
  it('should be able to apply 10% discount over £20 during checkout and have total', function () {
    customer.basket.resetBasket();
    customer.basket.addItems(chair, table);
    customer.basket.checkout();
    assert.equal(63, customer.basket.total)
  });
  it('should be able to apply bogof during checkout and have total', function () {
    customer.basket.resetBasket();
    customer.basket.addItems(spoon, spoon);
    customer.basket.checkout();
    assert.equal(1, customer.basket.total)
  });
  it('should be able to apply discount card discount at checkout and have total', function () {
    customer_with_saving.basket.addItems(chair);
    customer_with_saving.checkout();
    assert.equal(9.5, customer_with_saving.basket.total)
  });
  it('should be able to apply multiple discounts at checkout and have total', function () {
    customer_with_saving.basket.resetBasket();
    customer_with_saving.basket.addItems(spoon, spoon, chair, table);
    customer_with_saving.checkout();
    assert.equal(60.705, customer_with_saving.basket.total)
  });

});