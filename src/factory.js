'user strict';

const Factory = function(opts = {}) {
  const { klass, attrs } = opts;

  return Object.create({
    klass,

    attrs,

    create() {
      const evaluatedAttrs = Object.keys(this.attrs).reduce((h, key) => {
        const attr = this.attrs[key];

        h[key] = typeof attr === 'function' ? attr.call(this) : attr;

        return h;
      }, {});

      return new this.klass(evaluatedAttrs);
    }
  });
};

module.exports = Factory;
