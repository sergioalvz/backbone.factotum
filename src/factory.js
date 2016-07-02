'user strict';

const Factory = function(opts = {}) {
  const { klass, attrs } = opts;

  return Object.create({
    klass,

    attrs,

    create() {
      return new this.klass(this.attrs);
    }
  });
};

module.exports = Factory;
