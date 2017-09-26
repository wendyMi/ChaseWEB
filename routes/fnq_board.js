var express = require('express');
var router = express.Router();
var mysql=require('mysql');

/* GET home page. */
router.get('/fnq_board', function(req, res, next) {
           var login_id=global.login_id;
           res.render('fnq_board',{login_id:login_id});
});

/* POST home page. */
router.post('/fnq_board', function(req, res) {
            
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
            
            var fnq_title=req.body.fnq_title;
            var fnq_file=req.body.fnq_file;
            var fnq_text=req.body.fnq_text;
            
            var fnq_send="insert into fnq(fnq_title, fnq_file, fnq_text) values('"+fnq_title+"','"+fnq_file+"','"+fnq_text+"')";
            
            var insert_query= connection.query(fnq_send,function(err,result){
                                               if(err) {
                                               res.render(err);
                                               }else{
                                               console.log("insert success");
                                               res.redirect("fnq/1");
                                               }
                                               });
            
            connection.end();
});
module.exports = router;
