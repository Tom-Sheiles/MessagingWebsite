var fs = require('fs');
var fileName = './groups.urs';
var ursfileName = './users.urs';

module.exports = {
    connect: function(io, port){
        var groups = []
        var users = []

        // Get and save functions are responsible for reading to and writing from the files that store user and group information
        function getGroups(){
            fs.readFile(fileName, 'utf-8', function(err, groupData){
                if(err != null)
                    console.log("Could Not read group data");
                data = JSON.parse(groupData);
                
                groups = (data);
                console.log(groups);
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
        getUsers();
        

        const messaging = io.of('/messaging');

        // connection socket event is called when a new client connects to the server
        messaging.on('connection',(socket) =>{

            socket.on('getRooms', (m)=>{
                messaging.emit('roomList', JSON.stringify(groups));
            });

            // each socket.on call is called by each client connection 
            socket.on("addUser", (addGroup, name)=>{
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == addGroup)
                        groups[i]['users'].push(name);
                }
                saveData()
            });

            socket.on('removeUser', (removeGroup, name)=>{
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == removeGroup){
                        for(let j = 0; j < groups[i]['users'].length; j++){
                            if(groups[i]['users'][j] == name)
                            groups[i]['users'].splice(j,j);
                        }
                    }
                        
                }
                saveData()
            });

            socket.on('addChannel', (addGroup, name)=>{
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == addGroup)
                        groups[i]['rooms'].push(name);
                }
                messaging.emit('roomList', JSON.stringify(groups));
                saveData()
            });

            socket.on('removeChannel', (removeChannel, name)=>{
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == removeChannel){
                        for(let j = 0; j < groups[i]['rooms'].length; j++){
                            if(groups[i]['rooms'][j] == name)
                            groups[i]['rooms'].splice(j,j);
                        }
                    }
                        
                }
                messaging.emit('roomList', JSON.stringify(groups));
                saveData()
            });

            socket.on('addGroup', (name, user)=>{
                groups.push({'groupName':name, 'rooms':[], 'users':[user]})
                messaging.emit('roomList', JSON.stringify(groups));
                console.log("Groups", groups);
                saveData()
            });

            socket.on('removeGroup', (name)=>{
                console.log("name:", name)
                for(let i = 0; i < groups.length; i++){
                    if(groups[i]['groupName'] == name){
                        groups.splice(i,i);
                        messaging.emit('roomList', JSON.stringify(groups));
                    }
                }
                saveData()
            });

            socket.on('promote', (name, level)=>{
                
                for(let i = 0; i < users.length; i++){
                    if(users[i]['userName'] == name && users[i]['userName'] != 'supp')
                        users[i]['userLevel'] = level;
                }
                
                console.log(users)
                saveUsers();
               
            });

        });
    
    }
}