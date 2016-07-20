// Constructor
function ServerClient() {
  ServerClient.app = require('express')();
  ServerClient.http = require('http').Server(ServerClient.app);
  ServerClient.io = require('socket.io')(ServerClient.http);
  ServerClient.activeSocket = [];
}

// class methods
ServerClient.prototype.initServer = function() {

    ServerClient.app.get('/client',function(req,res){
      res.sendFile(__dirname + '/indexClient.html');
    });

    ServerClient.io.on('connection', function(socket){
      console.log('connection from client' + socket.id);

      ServerClient.io.to(socket.id).emit('chat message', socket.id);

      ServerClient.activeSocket.push(socket.id);

      socket.on('chat message', function(msg){
        console.log('message  from ' + socket.id + ' ' + msg);
        ServerClient.io.emit('chat message', msg);
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
module.exports = new ServerClient();
