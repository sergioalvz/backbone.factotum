'use strict';

require('chai').should();

const Factotum = Object.create({
  factories: {},

  reset() {
    this.factories = {};
  },

  define(name, klass, attrs = {}) {
    this.factories[name] = [klass, attrs];
  }
});

module.exports = Factotum;
