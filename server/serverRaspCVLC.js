// Constructor
function ServerRaspCVLC() {
    ServerRaspCVLC.spawn = require('child_process').spawn;
    ServerRaspCVLC.clvc = null;
}

// class methods
ServerRaspCVLC.prototype.initServer = function() {

};

ServerRaspCVLC.prototype.changeVideo = function(videoId){
  if(ServerRaspCVLC.clvc != null){
    ServerRaspCVLC.clvc.kill();
    ServerRaspCVLC.clvc = null;
  }

  ServerRaspCVLC.clvc = ServerRaspCVLC.spawn('cvlc', ['--no-video','http://youtu.be/' + videoId])
  ServerRaspCVLC.clvc.on('close', (code,signal) =>{
    ServerRaspCVLC.clvc = null;
  });

    ServerRaspCVLC.clvc.stderr.on('data', (data) =>{
      console.log('Data error ' + data);
    });
    ServerRaspCVLC.clvc.stdout.on('data', (data) =>{
      console.log('Data error ' + data);
    });
}


// export the class
module.exports = new ServerRaspCVLC();
