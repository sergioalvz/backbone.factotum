# Backbone.Factotum

A Backbone fully-compatible factory lib for creating JavaScript objects.

## Example

**factories.js**

```javascript
/*
 *
 * Let's suppose we have defined the following entities somewhere:
 *
 * const Job = Backbone.Model.extend({});
 *
 * const JobCollection = Backbone.Collection.extend({ model: Job });
 *
 * const User = Backbone.Model.extend({
 *   parse(attrs) {
 *     this.jobs = new JobCollection(attrs.jobs);
 *
 *     return _.omit(attrs, 'jobs');
 *   }
 * });
 *
 *
 */

const Factotum = require('backbone.factotum');

const Job = require('../job');
const User = require('../user');

Factotum.define('job', Job, { name: Factotum.sequence((i) => `Job ${i}`) });

Factotum.define('user', User, {
  id: Factotum.sequence((i) => i),
  name: 'Henry Chinaski',
  jobs: Factotum.create('job', 5)
});
```

**user.spec.js**
```javascript
const Factotum = require('backbone.factotum');

const JobCollection = require('../jobCollection');

describe('User', function() {
  it('creates a user model with a collection of jobs', function() {
    const user = Factotum.create('user', { parse: true });

    user.jobs.should.be.an.instanceof(JobCollection);
  });
});
```

## Features

This lib is heavily inspired in [`factory_girl`](https://github.com/thoughtbot/factory_girl), so they way for working with both of them is pretty similar.

* Sequences can be defined by using `Factotum.sequence`

```javascript
Factotum.sequence((i) => `My sequence item ${i}`)
```

* Factory definitions receive an object with the expected attributes.

```javascript
Factotum.define('user', User, {
  id: Factotum.sequence((i) => i),
  name: 'Henry Chinaski',
});
```

* Several objects can be created at once by passing an additional parameter to `Factotum.create`

```javascript
const users = Factotum.create('user', 10);
```

* Backbone options such as `parse` can be bridged from `Factotum` to the required object initialization

```javascript
const users = Factotum.create('user', 10, { parse: true });
```
