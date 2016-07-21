// Constructor
function Youtube(keyApi,interServerEvent) {
  Youtube.https = require('https');
  Youtube.keyApi = keyApi;
  Youtube.interServerEvent = interServerEvent;
}


// class methods
Youtube.prototype.searchVideo = function(searchArgs) {
  console.log('search video with : ' + searchArgs.name);

  var options = {
    host: 'www.googleapis.com',
    path: '/youtube/v3/search?part=id,snippet&maxResults=50&q='+ searchArgs.name +'&key='+Youtube.keyApi,
    method: 'GET',
  };

  callback = function(response){
    var str = '';
    response.on('data', function(chunk){
      str += chunk;
    });

    response.on('end', function(chunk){
      Youtube.interServerEvent.emit('search result', str, searchArgs.socketID);
    });
  }

  var req = Youtube.https.request(options, callback);
  req.end();
};

// export the class
module.exports = function(keyApi,interServerEvent){
  return new Youtube(keyApi,interServerEvent);
};
