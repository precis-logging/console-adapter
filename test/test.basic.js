var assert = require('assert');
var Adapter = require('../').ConsoleAdapter;
var noop = function(){};

describe('Console Logger Adapter', function(){
  it('Should deliver messages level<40 to log statement', function(done){
    var adapter = new Adapter({
      purdy: {
        plain: true
      },
      adapter: {
        log: function(src){
          var data = new Function('return '+src)();
          assert(data.level===10, 'Data level !== 10');
          assert(data.some==='data', 'data.some !== some');
          done();
        },
        error: function(){
          throw new Error('Error called instead of log');
        },
      }
    });
    adapter.push({level: 10, some: 'data'}, noop);
  });
  it('Should deliver messages level>=40 to error statement', function(done){
    var adapter = new Adapter({
      purdy: {
        plain: true
      },
      adapter: {
        log: function(){
          throw new Error('Log called instead of error');
        },
        error: function(src){
          var data = new Function('return '+src)();
          assert(data.level===40, 'Data level !== 40');
          assert(data.some==='data', 'data.some !== some');
          done();
        },
      }
    });
    adapter.push({level: 40, some: 'data'}, noop);
  });
});
