var fs = require('fs');
var fileName = './groups.urs';
var ursfileName = './users.urs';

module.exports = {
    connect: function(io, port, database){
        var groups = []
        var users = []
        const usersDB = database.collection('users');
        const channelDB = database.collection('channels');

        // Find the user and channel information from the database
        users = usersDB.find({}).toArray((err,userRes)=>{
            if(err) throw err;
            console.log(userRes);
            users = userRes
        })
        groups = channelDB.find({}).toArray((err,channelRes)=>{
            if(err) throw err;
            console.log(channelRes);
            groups = channelRes;
        })

       function updateGroups(){
        groups = channelDB.find({}).toArray((err,channelRes)=>{
            if(err) throw err;
            groups = channelRes;
            messaging.emit('roomList',JSON.stringify(groups));
        })
       }

        const messaging = io.of('/messaging');

        // connection socket event is called when a new client connects to the server
        messaging.on('connection',(socket) =>{

            socket.on('getRooms', (m)=>{
                messaging.emit('roomList', JSON.stringify(groups));
            });

            // each socket.on call is called by each client connection 
            socket.on("addUser", (addGroup, name)=>{
                console.log(addGroup, name)
                channelDB.updateOne({'groupName':addGroup},{$push:{"users":{$each:[name]}}},(err)=>{
                    if(err) throw err;
                    updateGroups();
                    console.log("added user");
                })
            });

            socket.on('removeUser', (removeGroup, name)=>{
                channelDB.updateOne({'groupName':removeGroup},{$pull:{"users":{$in:[name]}}},(err)=>{
                    if(err) throw err;
                    updateGroups();
                    console.log("Removed User");
                })
            });

            socket.on('addChannel', (addGroup, name)=>{
                channelDB.updateOne({'groupName':addGroup},{$push:{"rooms":{$each:[name]}}},(err)=>{
                    if(err) throw err;
                    updateGroups();
                    console.log("Added Room");
                })
            });

            socket.on('removeChannel', (removeChannel, name)=>{
                channelDB.updateOne({'groupName':removeChannel},{$pull:{"rooms":{$in:[name]}}},(err)=>{
                    if(err) throw err;
                    updateGroups();
                    console.log("Removed Room");
                });
            });

            socket.on('addGroup', (name, user)=>{
                console.log("socket");
                channelDB.insertOne({"groupName":name,'rooms':[],'users':[user]},()=>{
                    updateGroups();
                    console.log("added Group");
                });
            });

            socket.on('removeGroup', (name)=>{
                
                channelDB.deleteOne({"groupName":name},(err,deleted)=>{
                    console.log("Delete " + name)
                    updateGroups();
                });
            });

            socket.on('promote', (name)=>{
                console.log("promote")
                usersDB.find({"userName":name}).toArray((err,result)=>{
                    if(result[0].userLevel < 4){
                        usersDB.updateOne({"userName":name},{$set:{"userLevel":result[0].userLevel+1}},(err)=>{
                            updateGroups();
                            console.log("Set " + name + " to level " + result[0].userLevel+1);
                        })
                    }
                })
                
               
               
            });

        });
    
    }
}


        // Get and save functions are responsible for reading to and writing from the files that store user and group information
        /*function getGroups(){
            fs.readFile(fileName, 'utf-8', function(err, groupData){
                if(err != null)
                    console.log("Could Not read group data");
                data = JSON.parse(groupData);
                
                groups = (data);
                //console.log(groups);
            });
        }
        function saveData(){
            string = JSON.stringify(groups)
            fs.writeFile(fileName, string, (err)=>{
                console.log("Written to group file")
            });
        }
        function getUsers(){
            fs.readFile(ursfileName, 'utf-8', function(err, usersData){
                data = JSON.parse(usersData)
                users = (data);
            });
        }
        function saveUsers(){
            string = JSON.stringify(users)
            fs.writeFile(ursfileName, string, (err)=>{
                console.log("Written to users file")
            })
        }
        
        getGroups();
        getUsers(); */