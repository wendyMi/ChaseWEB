var express = require('express');
var router = express.Router();
var mysql=require('mysql');

/* GET home page. */
router.get('/material_board', function(req, res, next) {
           var login_id=global.login_id;
           res.render('material_board',{login_id:login_id});
});

/* POST home page. */
router.post('/material_board', function(req, res) {
            
            var login_id=global.login_id;
            
            console.log("Posting...");
            
            var connection=mysql.createConnection({
     host: '10.0.0.1',
                        port: '3306',
                        user: 'peakchase',
                        password :'wendy0917',
                        database : 'peakchase'
            });
            
            connection.connect();
            
            var story_no=req.body.story_no;
            var material_title=req.body.material_title;
            var material_path=req.body.material_file;
            var material_text=req.body.material_text;
            
            var material_send="insert into material(story_no, material_title, material_path, material_text) values('"+story_no+"','"+material_title+"','"+material_path+"','"+material_text+"')";
            
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
