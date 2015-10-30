var assert = require('assert');
var Adapter = require('../').ConsoleAdapter;
var noop = function(){};

describe('Console Logger Adapter', function(){
  it('Should deliver messages level<40 to log statement', function(done){
    var adapter = new Adapter({
      adapter: {
        log: function(data){
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
      adapter: {
        log: function(data){
          throw new Error('Log called instead of error');
        },
        error: function(){
          done();
        },
      }
    });
    adapter.push({level: 40, some: 'data'}, noop);
  });
});
