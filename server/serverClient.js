var EventEmitter = require('events').EventEmitter;

// Constructor
function ServerClient(interServerEvent) {
  ServerClient.app = require('express')();
  ServerClient.http = require('http').Server(ServerClient.app);
  ServerClient.io = require('socket.io')(ServerClient.http);
  ServerClient.activeSocket = [];
  ServerClient.interServerEvent = interServerEvent;
}
ServerClient.prototype.__proto__ = EventEmitter.prototype;

// class methods
ServerClient.prototype.initServer = function() {

    ServerClient.app.get('/client',function(req,res){
      res.sendFile(__dirname + '/html/indexClient.html');
    });

    ServerClient.io.on('connection', function(socket){
      console.log('connection from client' + socket.id);

      ServerClient.io.to(socket.id).emit('search', socket.id);

      ServerClient.activeSocket.push(socket.id);

      socket.on('search', function(msg){
        console.log('message  from ' + socket.id + ' ' + msg);
        ServerClient.io.emit('update list', msg);
	
	var searchArgs = {
		name : msg,
		socketID : socket.id
	};
	ServerClient.interServerEvent.emit('search','bla');
      });



      socket.on('disconnect', function(){
        console.log('disconnect from ' + this.id);
      });
    });
    
 

    ServerClient.http.listen(3001, function(){
      console.log('listening on *:3001');
    });
};

// export the class
module.exports = function(interServerEvent) { 
 return new ServerClient(interServerEvent);
}
