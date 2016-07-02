'use strict';

const Factory = require('./factory');

const Factotum = Object.create({
  factories: {},

  sequence(callback) {
    let counter = 0;

    return () => callback.call(this, counter++);
  },

  reset() {
    this.factories = {};
  },

  define(name, klass, attrs = {}) {
    this.factories[name] = Factory({ klass, attrs });
  },

  create(name, numberOfItems = 1, opts = {}) {
    const items = this.factories[name].create(numberOfItems, opts);

    return numberOfItems > 1 ? items : items.shift();
  }
});

module.exports = Factotum;
