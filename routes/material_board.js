var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var multer=require('multer');
var upload=multer({dest :'home/hosting_users/peakchase/apps/peakchase_chase/upload/'});

/* GET home page. */
router.get('/material_board', function(req, res, next) {
           var login_id=global.login_id;
           if(login_id!="admin"){
            res.send('<script>alert("권한이 없습니다.");self.close();parent.location.replace("/material/1/1");</script>');
           }else{
            res.render('material_board',{login_id:login_id});
           }
});

/* POST home page. */
router.post('/material_board', upload.single('material_file'), function(req, res) {
            
            var filename=req.file.filename;
            console.log(req.file);
            var login_id=global.login_id;
            
            console.log("Posting...");
            
            var connection=mysql.createConnection({
                                                host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
            });
            
            connection.connect();
            
            var story_no=req.body.story_no;
            var material_title=req.body.material_title;
            var material_text=req.body.material_text;
            
            
            var material_send="insert into material(story_no, material_title, material_path, material_text) values('"+story_no+"','"+material_title+"','"+filename+"','"+material_text+"')";
            
            
            var insert_query= connection.query(material_send,function(err,result){
                                               if(err) {
                                               res.render(err);
                                               }else{
                                               console.log("insert success");
                                               res.redirect("material/1/1");
                                               }
            });
            
            connection.end();
});
module.exports = router;
