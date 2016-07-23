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
    fs = require('fs');
	
    var nbCSS = 2;
    var cssLoaded = 0;

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<!DOCTYPE html>\n<html lang="en-US">\n<head>\n<style>');

    sendHTML = function () {
    fs.readFile(__dirname + '/html/indexClient.html', function(err, data){
	 res.write(data);
	 res.end();
    });
    };

    fs.readFile(__dirname + '/html/css/components.css', function(err, data){
	 res.write(data);
	 cssLoaded ++;
	if(cssLoaded === nbCSS){
	  sendHTML();	
	}
	 
    });

    fs.readFile(__dirname + '/html/css/responsee.css', function(err, data){
	res.write(data);
	cssLoaded ++;
	if(cssLoaded === nbCSS){
	  sendHTML();	
	}
	 
    });
	

  }); 

  ServerClient.io.on('connection', function(socket){
    console.log('connection from client' + socket.id);

    ServerClient.activeSocket.push(socket.id);

    socket.on('search', function(msg){
      var searchArgs = {
        name : msg,
        socketID : socket.id
      };
      ServerClient.interServerEvent.emit('search',searchArgs);
    });

    socket.on('disconnect', function(){
      console.log('disconnect from ' + this.id);
    });

    socket.on('select video', function(videoId){
      ServerClient.interServerEvent.emit('select video result',videoId);
      console.log('select video from : ' + this.id + ' video id : ' + videoId);
    });
  });



  ServerClient.http.listen(3001, function(){
    console.log('listening on *:3001');
  });
};

ServerClient.prototype.updateList = function(list, socketID){
  // console.log('send new list : ' + list);
    ServerClient.io.to(socketID).emit('update list', list);
};
// export the class
module.exports = function(interServerEvent) {
  return new ServerClient(interServerEvent);
}
