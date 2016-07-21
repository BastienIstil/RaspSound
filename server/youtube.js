// Constructor
function Youtube(keyApi,interServerEvent) {
  Youtube.https = require('https');
  Youtube.keyApi = keyApi;
  Youtube.interServerEvent = interServerEvent;
}


// class methods
Youtube.prototype.searchVideo = function(searchArgs) {
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
      Youtube.interServerEvent.emit('search result', result, searchArgs.socketID);
    });
  }

  var req = Youtube.https.request(options, callback);
  req.end();
};

// export the class
module.exports = function(keyApi,interServerEvent){
  return new Youtube(keyApi,interServerEvent);
};
