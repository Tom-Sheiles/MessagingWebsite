module.exports = {
    connect: function(io, port){
        var groups = []
        groups.push({"groupName":"group1","rooms":["room1","room2"],"users":[]});


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