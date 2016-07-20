const util = require('util');
var EventEmitter = require('events').EventEmitter;

// Constructor
function Youtube() {
  Youtube.https = require('https');
}

// class methods
Youtube.prototype.searchVideo = function(keyApi) {
  var options = {
    host: 'www.googleapis.com',
    path: '/youtube/v3/search?part=id&key='+keyApi,
    method: 'GET',
  };

  callback = function(response){
    var str = '';
    response.on('data', function(chunk){
      str += chunk;
    });

    response.on('end', function(chunk){
      var result = JSON.parse(str);
    });
  }

  var req = Youtube.https.request(options, callback);
  req.end();
};

util.inherits(Youtube, EventEmitter);
// export the class
module.exports = new Youtube();
