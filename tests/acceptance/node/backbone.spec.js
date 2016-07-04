'use strict';

require('../../helper');

const _ = require('underscore');
const Backbone = require('backbone');

const Factotum = require('../../../backbone.factotum');

// =====
// Some Backbone entities
// =====

const Job = Backbone.Model.extend({});

const JobCollection = Backbone.Collection.extend({ model: Job });

const User = Backbone.Model.extend({
  parse(attrs) {
    this.jobs = new JobCollection(attrs.jobs);

    return _.omit(attrs, 'jobs');
  }
});

// =====

describe('Acceptance', function() {
  describe('working with Backbone', function() {
    beforeEach(function() {
      Factotum.define('job', Job, { name: Factotum.sequence((i) => `Job ${i}`) });

      Factotum.define('user', User, {
        id: Factotum.sequence((i) => i),
        name: Factotum.sequence((i) => `User ${i}`),
        jobs: Factotum.create('job', 5)
      });
    });

    it('creates a user model with a collection of jobs', function() {
      const user = Factotum.create('user');

      user.get('jobs').should.exist;
    });

    it('accepts extra options for creating the required objects', function() {
      const user = Factotum.create('user', { parse: true });

      user.jobs.should.be.an.instanceof(JobCollection);
    });
  });
});
