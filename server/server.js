var express = require('express');
var app = express();
var http = require('http').Server(app);
var filePath = require('path');
var bodyParser = require('body-parser');
var cors = require("cors");
const io = require('socket.io')(http);
const sockets = require("./socket.js");

var mongo = require("mongodb").MongoClient;
var mongoUrl = "mongodb://localhost:27012";

app.use(cors());

app.use(express.static(__dirname + '/../dist/Messaging'));
app.use(bodyParser.json());

var port = 3000;
var dbo;

// Begin listening for client connection on the specified port
var server = http.listen(port, function(){
    console.log("\nStarted Server on ", port)
    
    console.log("----starting Database----");
    mongo.connect(mongoUrl, {poolSize:10,useNewUrlParser:true,useUnifiedTopology:true},function(err,db){
        if(err)
            console.log("Database Connection Failed: " + err)
        else{
            console.log("    Database Connected");
            dbo = db.db("MessagingDatabase")
            dbo.createCollection("users",function(err,res){
                if(err)
                    console.log("Error creating users database");
                else{
                    console.log("    Users database Created");
                }
            });
            dbo.createCollection("channels",function(err,res){
                if(err)
                    console.log("Error creating channel database");
                else{
                    console.log("    Channel database created");
                }
            })
        }
        require('./auth')(app,filePath, dbo);
        sockets.connect(io, 3000, dbo);

    });
});




