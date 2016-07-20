var youtubeKeyApi;

var nextIsYoutubeKeyApi =  false;
process.argv.forEach(function(val, index, array){
  console.log(index + ':' + val);

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

var serverRasp = require('./serverRasp');
var serverClient = require('./serverClient');
var youtube = require('./youtube');

serverRasp.initServer();
serverClient.initServer();

//youtube.searchVideo(youtubeKeyApi);
