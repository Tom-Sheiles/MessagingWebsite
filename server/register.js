module.exports = function(app, path, database){

    app.post("/register", function(req, res){
        
        var newUser = req.body;
        const db = database.collection("users");

        db.find({"userName":newUser.userName}).toArray((err,result)=>{
            if(err) throw err;
            if(result.length > 0){
                res.send({register:"userExists"});
            }else{
                db.insertOne({"userName":newUser.userName,
                              "password":newUser.password,
                              "email":newUser.email,
                              "userLevel":1
                        },(err)=>{
                            if(err) throw err;
                            res.send({register:"userCreated"});
                        });
            }
        })
    });

}