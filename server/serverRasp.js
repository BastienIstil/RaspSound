// Constructor
function ServerRasp() {
  ServerRasp.app = require('express')();
  ServerRasp.http = require('http').Server(ServerRasp.app);
  ServerRasp.io = require('socket.io')(ServerRasp.http);
  ServerRasp.raspEvent = require('events');
}

// class methods
ServerRasp.prototype.initServer = function() {

    ServerRasp.app.get('/rasp',function(req,res){
      res.sendFile(__dirname + '/html/indexRasp.html');
    });

    ServerRasp.io.on('connection', function(socket){
      console.log('Raspberry connected');
      socket.on('change video', function(videoId){
        console.log('Change video');
        console.log(msg);
        ServerRasp.io.emit('change video', videoId);
      });
    });

    ServerRasp.http.listen(3000, function(){
      console.log('listening on *:3000');
    });
};


// export the class
module.exports = new ServerRasp();
