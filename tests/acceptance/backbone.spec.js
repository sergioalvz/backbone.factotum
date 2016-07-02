'use strict';

require('../helper');

const Backbone = require('backbone');

const Factotum = require('../../src/backbone.factotum');

describe('Acceptance', function() {
  describe('working with Backbone', function() {
    const User = Backbone.Model.extend({});

    beforeEach(function() {
      Factotum.define('job', User, { name: Factotum.sequence((i) => `Job ${i}`) });

      Factotum.define('user', User, {
        id: Factotum.sequence((i) => i),
        name: Factotum.sequence((i) => `User ${i}`),
        jobs: Factotum.create('job', 5).map((job) => job.toJSON())
      });
    });

    afterEach(function() {
      Factotum.reset();
    });

    it('creates a user model with a collection of jobs', function() {
      const user = Factotum.create('user');

      user.get('jobs').should.exist;
    });
  });
});
