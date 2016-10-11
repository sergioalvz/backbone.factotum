(function (factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    window.Backbone = window.Backbone || {};

    window.Backbone.Factotum = factory();
  }
}(function() {
  'use strict';

  const Factory = function(factoryOpts = {}) {
    const { klass, attrs } = factoryOpts;

    return Object.create({
      klass,

      attrs,

      create(numberOfItems, opts) {
        return Array.apply(null, Array(numberOfItems)).map(() => {
          const evaluatedAttrs = Object.keys(this.attrs).reduce((h, key) => {
            const attr = this.attrs[key];

            h[key] = typeof attr === 'function' ? attr.call(this) : attr;

            return h;
          }, {});

          return new this.klass(evaluatedAttrs, opts);
        });
      }
    });
  };

  return Object.create({
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
      if (typeof numberOfItems === 'object') {      // if the second parameter is an object
        [opts, numberOfItems] = [numberOfItems, 1]; // we assume they are omitting 'numberOfItems'
      }

      const items = this.factories[name].create(numberOfItems, opts);

      return numberOfItems > 1 ? items : items.shift();
    }
  });
}));
