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
    beforeEach(function() {
      Factotum.define('user', User, {
        name: 'Henry Chinaski',
        email: Factotum.sequence((i) => `employee${i}@postman.com`)
      });
    });

    afterEach(function() {
      Factotum.reset();
    });

    it('creates the requested number of objects', function() {
      Factotum.create('user', 5).should.have.lengthOf(5);
    });

    it('creates new objects of the required type', function() {
      Factotum.create('user').should.be.an.instanceof(User);
    });

    it('applies the attributes from the factory definition', function() {
      Factotum.create('user').get('name').should.be.equal('Henry Chinaski');
    });

    it('works with complex definitions', function() {
      Factotum.create('user').get('email').should.be.equal('employee0@postman.com');
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
