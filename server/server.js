var express = require('express');
var app = express();
var http = require('http').Server(app);
var filePath = require('path');
var bodyParser = require('body-parser');
var cors = require("cors");
const io = require('socket.io')(http);
const sockets = require("./socket.js");

app.use(cors());

app.use(express.static(__dirname + '/../dist/Messaging'));
app.use(bodyParser.json());

var port = 3000;

// Begin listening for client connection on the specified port
var server = http.listen(port, function(){
    console.log("Started Server on ", port)
});

sockets.connect(io, 3000);

require('./auth')(app,filePath);
