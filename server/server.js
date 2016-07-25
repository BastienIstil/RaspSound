// parse Args
{
  var youtubeKeyApi;
  var nextIsYoutubeKeyApi =  false;
  var useCVLC = false;

  process.argv.forEach(function(val, index, array){
    if(val == '--YoutubeKeyApi'){
      nextIsYoutubeKeyApi = true;
    }
    else if(nextIsYoutubeKeyApi){
      youtubeKeyApi = val;
      nextIsYoutubeKeyApi = false;
    }
    else if(val == '--CVLC'){
      useCVLC = true;
    }
    console.log('Arg : ' + val);
  });

  if(youtubeKeyApi === undefined){
    return;
  }
}

// init server
var interServerEvent = require('./interServerEvent');
var serverRasp;

if(useCVLC)
   serverRasp = require('./serverRaspCVLC');
else
   serverRasp = require('./serverRasp');

var serverClient = require('./serverClient')(interServerEvent);
var youtube = require('./youtube')(youtubeKeyApi,interServerEvent);

serverRasp.initServer();
serverClient.initServer();

interServerEvent.on('search', function(searchArgs) {
//  var fs = require('fs');
//  fs.readFile(__dirname + '/resultSearchYoutube.txt', function(err, data){
//    if(err) throw err;
//      interServerEvent.emit('search result',
//       data,
//       searchArgs.socketID);
//  });
  youtube.searchVideo(searchArgs);
});

interServerEvent.on('search result', function(result,socketID){
  console.log('search result from : ' + socketID);
  serverClient.updateList(result,socketID);
});

interServerEvent.on('select video result', function(videoId){
  serverRasp.changeVideo(videoId);
});
