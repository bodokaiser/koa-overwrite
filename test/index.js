var assert     = require('assert');
var koa        = require('koa');
var overwrite  = require('../lib');
var bodyparser = require('koa-bodyparser');
var supertest  = require('supertest');

describe('overwrite()', function() {

  beforeEach(function() {
    this.app = koa();
    this.app.use(bodyparser());
    this.app.use(overwrite());
    this.app.on('error', function() {});
  });

  it('should respond error', function(done) {
    this.app.use(function* (next) {
      this.status = 200;
    });

    supertest(this.app.listen()).post('/')
      .type('form')
      .send({
        user: {
          name: 'Bodo',
          city: 'Berlin'
        },
        _method: 'SHIIET'
      })
      .expect(400, done);
  });

  it('should overwrite method', function(done) {
    this.app.use(function* (next) {
      assert(this.method, 'PUT');

      this.status = 200;
    });

    supertest(this.app.listen()).post('/')
      .type('form')
      .send({
        user: {
          name: 'Bodo',
          city: 'Berlin'
        },
        _method: 'PUT'
      })
      .expect(200, done);
  });

  it('should not overwrite method', function(done) {
    this.app.use(function* (next) {
      assert(this.method, 'DELETE');

      this.status = 200;
    });

    supertest(this.app.listen()).del('/').expect(200, done);
  });

});
