'user strict';

const Factory = function(factoryOpts = {}) {
  const { klass, attrs } = factoryOpts;

  return Object.create({
    klass,

    attrs,

    create(numberOfItems, opts) {
      return new Array(numberOfItems).fill().map(() => {
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

module.exports = Factory;
