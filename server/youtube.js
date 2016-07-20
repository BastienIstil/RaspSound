const util = require('util');
var EventEmitter = require('events').EventEmitter;

// Constructor
function Youtube(keyApi) {
  Youtube.https = require('https');
  Youtube.keyApi = keyApi;
}
util.inherits(Youtube, EventEmitter);


// class methods
Youtube.prototype.searchVideo = function() {
  var options = {
    host: 'www.googleapis.com',
    path: '/youtube/v3/search?part=id&key='+Youtube.keyApi,
    method: 'GET',
  };

  callback = function(response){
    var str = '';
    response.on('data', function(chunk){
      str += chunk;
    });

    response.on('end', function(chunk){
      var result = JSON.parse(str);
      console.log(str);
    });
  }

  var req = Youtube.https.request(options, callback);
  req.end();
};

// export the class
module.exports = function(keyApi){
  return new Youtube(keyApi);
};
