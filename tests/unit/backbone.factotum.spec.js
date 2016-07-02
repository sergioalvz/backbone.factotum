'use strict';

require('../helper');

const Backbone = require('backbone');

const Factotum = require('../../src/backbone.factotum');

describe('Factotum', function() {
  const User = Backbone.Model.extend({});

  describe('#define', function() {
    beforeEach(function() {
      Factotum.reset();
    });

    it('creates a new entry in the factories object', function() {
      Factotum.define('user', User);

      Factotum.factories.should.have.keys('user');
    });

    it('saves the new factory definition', function() {
      Factotum.define('user', User);

      Factotum.factories['user'].should.be.an.instanceof(Object);
    });
  });

  describe('#create', function() {
    it('creates objects from the factory definition', function() {
      Factotum.define('user', User);

      const user = Factotum.create('user');

      user.should.be.an.instanceof(User);
    });
  });

  describe('#sequence', function() {
    it('increases by one the counter', function() {
      const sequence = Factotum.sequence((i) => i);

      sequence().should.be.equal(0);
      sequence().should.be.equal(1);
      sequence().should.be.equal(2);
    });

    it('returns the defined value', function() {
      const sequence = Factotum.sequence((i) => `My sequence number ${i}`);

      sequence().should.be.equal('My sequence number 0');
    });
  });
});
