var fs = require('fs')
var userFile = "./users.urs";

module.exports = function(app, path){

    app.post('/auth', function(req, res){

        console.log(req.body);
        
        fs.readFile(userFile, "utf-8", function(err, buffer){
            if(err != null){
                console.log("Error Reading User file. Check if users.urs exists in the server directory");
            }else{
                buffer = JSON.parse(buffer)
                console.log(buffer);
                for(let i = 0; i < buffer.length; i++){
                    console.log(buffer[i].userName);
                }
                buffer.push({"userName":"test","userLevel":1});
                var userString = JSON.stringify(buffer);

                //fs.writeFile(userFile, userString, (err) =>{
                    //console.log("written to file");
               // });
            }
        });

        res.send({"res":"valid"});
        
    });
}