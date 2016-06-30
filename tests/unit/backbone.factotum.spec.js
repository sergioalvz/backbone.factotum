'use strict';

const Backbone = require('backbone');

const Factotum = require('../../backbone.factotum');

describe('Factotum', function() {
  describe('#define', function() {
    const User = Backbone.Model.extend({});

    beforeEach(function() {
      Factotum.reset();
    });

    it('stores the definition for new factories', function() {
      Factotum.define('user', User);

      Factotum.factories.should.have.keys('user');
    });

    it('stores the constructor for creating new factories', function() {
      Factotum.define('user', User);

      Factotum.factories['user'][0].should.be.equal(User);
    });

    it('stores the attributes for initializing new factories', function() {
      const userAttrs = { name: 'Henry Chinaski' };

      Factotum.define('user', User, userAttrs);

      Factotum.factories['user'][1].should.be.equal(userAttrs);
    });
  });
});
