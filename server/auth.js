var fs = require('fs')

module.exports = function(app, path){

    app.post('/auth', function(req, res){
        console.log("Auth Route");
        res.send({"ok":false});
    });
}