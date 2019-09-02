var fs = require('fs')
var userFile = "./users.urs";

module.exports = function(app, path){

    // Post request is called from the login page of the client and the validity of the request and user information is returned in the respons
    app.post('/auth', function(req, res){

        console.log("User: ", req.body.userName);
        currentUser = undefined;

        fs.readFile(userFile, "utf-8", function(err, userData){
            
            
            if(err != null){
                console.log("Error Reading User file. Check if users.urs exists in the server directory");
            }else{

                userData = JSON.parse(userData)
                userExists = false;
                for(let i = 0; i < userData.length; i++){

                    //Check if user Already Exists
                    if(userData[i].userName == req.body.userName){
                        userExists = true;
                        currentUser = userData[i];
                        console.log(currentUser)
                    }

                }

                if(!userExists){
                    newUser = {"userName":req.body.userName,"userLevel":1};
                    currentUser = newUser;
                    userData.push(newUser);
                }

                var userString = JSON.stringify(userData);

                fs.writeFile(userFile, userString, (err) =>{
                    console.log("written to file");
                });

                currentUser['res'] = 'valid';
                console.log(currentUser);
                res.send(currentUser);
            }
        });

       //
        
    });
}