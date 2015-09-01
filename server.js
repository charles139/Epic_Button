// require express and path
var express = require("express");

var path = require("path");
// create the express app
var app = express();

// static content 
app.use(express.static(path.join(__dirname, "./static")));
// setting up ejs and our views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// root route to render the index.ejs view
app.get('/', function(req, res) {
 res.render("index");
})
// tell the express app to listen on port 8000
var server = app.listen(8000, function() {
 console.log("listening on port 8000");
})

var io = require('socket.io').listen(server);

io.sockets.on('connect', function (socket){
	console.log("sockets are on");
	console.log("socket id: " + socket.id);

	var counter = 0;

	socket.on('button_pushed', function(){
		console.log("button was pushed into server side");
		counter+=1;
		io.emit('numb_times', {response: counter});
	});

	socket.on('reset_pushed', function(){
		console.log("reset button push");
		counter = 0;
		io.emit('counter_reset', {response: counter});
	});
});