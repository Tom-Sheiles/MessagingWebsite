module.exports = {
    connect: function(io, port){
        var groups = []
        groups.push({"groupName":"Group 1","rooms":["room1","room2","room3","r4","r5","r6"],"users":["user2","user3","user5"]},{"groupName":"Group 2","rooms":["room4","room5","room6"],"users":["user1","user5"]});


        const messaging = io.of('/messaging');

        messaging.on('connection',(socket) =>{
            console.log("Client Connected");
            console.log(groups)

            socket.on('getRooms', (m)=>{
                messaging.emit('roomList', JSON.stringify(groups));
            });
        });
    
    }
}