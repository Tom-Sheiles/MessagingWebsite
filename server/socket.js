var fs = require('fs');
var fileName = './groups.urs';

module.exports = {
    connect: function(io, port){
        var groups = []

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
        
        //groups.push({"groupName":"Group 1","rooms":["room1","room2","room3","r4","r5","r6"],"users":["user2","user3","user5"]},{"groupName":"Group 2","rooms":["room4","room5","room6"],"users":["user1","user5"]});
        getGroups();
        

        const messaging = io.of('/messaging');

        messaging.on('connection',(socket) =>{

            socket.on('getRooms', (m)=>{
                messaging.emit('roomList', JSON.stringify(groups));
            });


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

        });
    
    }
}