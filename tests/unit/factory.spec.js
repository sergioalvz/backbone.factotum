'use strict';

require('chai').should();

const Backbone = require('backbone');

const Factory = require('../../src/factory');

describe('Factory', function() {
  describe('#create', function() {
    const User = Backbone.Model.extend({});

    const factoryOpts = {
      klass: User,
      attrs: {
        name: 'Henry Chinaski'
      }
    };

    it('creates a new object from the factory definition', function() {
      const userFactory = Factory(factoryOpts);

      const user = userFactory.create();

      user.should.be.an.instanceof(User);
    });

    it('applies the attributes from the factory definition', function() {
      const userFactory = Factory(factoryOpts);

      const user = userFactory.create();

      user.get('name').should.be.equal('Henry Chinaski');
    });
  });
});
