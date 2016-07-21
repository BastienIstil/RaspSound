// parse Args
{
  var youtubeKeyApi;
  var nextIsYoutubeKeyApi =  false;

  process.argv.forEach(function(val, index, array){
    if(val == '--YoutubeKeyApi'){
      nextIsYoutubeKeyApi = true;
    }
    else if(nextIsYoutubeKeyApi){
      youtubeKeyApi = val;
      nextIsYoutubeKeyApi = false;
    }
  });

  if(youtubeKeyApi === undefined){
    return;
  }
}

// init server
var interServerEvent = require('./interServerEvent');
var serverRasp = require('./serverRasp');
var serverClient = require('./serverClient')(interServerEvent);
var youtube = require('./youtube')(youtubeKeyApi);

serverRasp.initServer();
serverClient.initServer();

interServerEvent.on('search', function() {
  console.log('search from client');
});
