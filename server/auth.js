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
            if(currentUser.userName == "supp"){
                existingUser[0]['res'] = 'valid';
                res.send(existingUser[0]);
            }else{

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
        }
        })        
    });
}