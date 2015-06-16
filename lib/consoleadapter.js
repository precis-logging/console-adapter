var util = require('util');

var ConsoleAdapter = function(options){
  this.options = options;
};

ConsoleAdapter.prototype.push = function(data, callback){
  if(data.level >= 40){
    console.error(util.inspect(data, this.options.console || {showHidden: true, depth: null, colors: true}));
    return callback();
  }
  console.log(util.inspect(data, this.options.console || {showHidden: true, depth: null, colors: true}));
  return callback();
};

module.exports = {
  ConsoleAdapter: ConsoleAdapter
};
