# koa-overwrite

**koa-overwrite** parses the hidden `_method` field in forms to emit
RESTful routing with HTML Forms.

## Usage

    var app = koa();

    // overwrite must have access to submitted form
    // by accessing "this.request.body" !!
    app.use(bodyparser());

    // overwrites this.method with `_method` if provided
    app.use(overwrite());

    app.use(function* (next) {
      switch (this.method) {
        case 'GET':
          yield this.render('form');
          break;
        case 'PUT':
          console.log(this.request.body);

          this.redirect('/');
          break;
      }
    });

    app.use(static(__dirname + '/public'));

    app.listen(3000);

## Install

With our lovely [npm](https://github.com/npm/npm)

    $ npm install --save koa-overwrite

## License

Copyright 2014 Bodo Kaiser <i@bodokaiser.io>

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
