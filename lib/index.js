var methods = require('methods');

module.exports = function(options) {
  return function* overwrite(next) {
    var body   = this.request.body;
    var method = this.request.method;

    if (body && body._method) {
      method = body._method.toUpperCase();
    }

    if (!~methods.indexOf(method.toLowerCase())) {
      this.throw('Invalid method overwrite.', 400);
    }

    this.request.method = method;

    yield next;
  }
};
