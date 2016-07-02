'use strict';

require('./helper');

const Backbone = require('backbone');

const Factotum = require('../../src/backbone.factotum');
const Factory = require('../../src/factory');

describe('Factory', function() {
  describe('#create', function() {
    const User = Backbone.Model.extend({});

    let factoryOpts;

    beforeEach(function() {
      factoryOpts = {
        klass: User,
        attrs: {
          name: 'Henry Chinaski',
          email: Factotum.sequence((i) => `employee${i}@postman.com`)
        }
      };
    });

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

    it('works with complex definitions', function() {
      const userFactory = Factory(factoryOpts);

      const user = userFactory.create();

      user.get('email').should.be.equal('employee0@postman.com');
    });
  });
});
