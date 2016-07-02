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

  create(name) {
    return this.factories[name].create();
  }
});

module.exports = Factotum;
