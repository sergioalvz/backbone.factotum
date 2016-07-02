'use strict';

require('../helper');

const Backbone = require('backbone');

const Factotum = require('../../src/backbone.factotum');

describe('Acceptance', function() {
  describe('working with Backbone', function() {
    const User = Backbone.Model.extend({});
    const FriendCollection = Backbone.Collection.extend({});

    beforeEach(function() {
      Factotum.define('friendCollection', FriendCollection);

      Factotum.define('user', User, {
        id: Factotum.sequence((i) => i),
        name: Factotum.sequence((i) => `User ${i}`),
        friends: Factotum.create('friendCollection')
      });
    });

    afterEach(function() {
      Factotum.reset();
    });

    it('creates a user model with a collection of friends', function() {
      const user = Factotum.create('user');

      user.get('friends').should.exist;
    });
  });
});
