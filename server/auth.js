var fs = require('fs')
var userFile = "./users.urs";

module.exports = function(app, path, database){

    // Post request is called from the login page of the client and the validity of the request and user information is returned in the respons
    app.post('/auth', function(req, res){

        console.log("User: ", req.body);
        currentUser = req.body;

        const db = database.collection('users');

        db.find({userName: currentUser.userName}).toArray((err,existingUser)=>{
            console.log(existingUser);
            if(existingUser.length == 0){
                res.send({res:"invalid"});
            }else{
                if(existingUser[0].password != currentUser.password){
                    res.send({valid:"Password Incorrect"});
                }else{
                existingUser[0]['res'] = 'valid';
                res.send(existingUser[0]);
                }
            }
        })

        /*db.insertOne(req.body, (err, result)=>{
            if(err) throw err;
            console.log("Added " + req.body.userName + " To the database")
            var users = db.find({}).toArray(function(err,result){
                if(err) throw err;
                console.log(result);
            })
        })*/

        
        /*
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

       */
        
    });
}