module.exports = function(app,formidable){
    
    app.post('/imageStorage',(req,res)=>{
        var form = new formidable.IncomingForm({uploadDir: './images'});
        form.keepExtensions = true;

        form.on('error',(err)=>{
            throw err;
        })

        form.on('fileBegin',function(name,file){
            file.path = form.uploadDir + "/" + file.name;
            console.log("upload")
        })

        form.on('file',function(field,file){
            res.send({result:"ok",name:file.name})
        })

        form.parse(req);
    })
}