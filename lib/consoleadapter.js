var util = require('util');
var Purdy = require('purdy');

var inspect = function(data, options){
  return Purdy.stringify(data, options);
};

var ConsoleAdapter = function(options){
  this.options = options || {};
  this.log = this.options.adapter || {
    log: function(data){
      console.log(data);
    },
    error: function(data){
      console.error(data);
    },
  };
};

ConsoleAdapter.prototype.push = function(data, callback){
  if(data.level >= 40){
    this.log.error(inspect(data, this.options.purdy));
    return callback();
  }
  this.log.log(inspect(data, this.options.purdy));
  return callback();
};

module.exports = {
  ConsoleAdapter: ConsoleAdapter
};
