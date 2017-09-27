var express = require('express');
var router = express.Router();
var mysql=require('mysql');

/* GET home page. */
router.get('/student/:page', function(req, res, next) {
           
           var page=req.params.page;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                        host: '10.0.0.1',
                        port: '3306',
                        user: 'peakchase',
                        password :'wendy0917',
                        database : 'peakchase'
            });
           
           connection.connect();
           
           var sql="select c.user_id, c.user_done, s.student_name from chase_user c,"+login_id+"_student s where s.student_id=c.user_id";
           
           var query = connection.query(sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        console.log(rows);
                                        res.render('student',{login_id:login_id,rows: rows,page:page,leng:Object.keys(rows).length-1, page_num:10,pass: true});
                                        });
           
           
           connection.end();
});

router.post('/student/:page', function(req, res){
            
            console.log("Posting...");
            
            var login_id=global.login_id;
            
            var connection=mysql.createConnection({
                                                  host: '10.0.0.1',
                                                  port: '3306',
                                                  user: 'peakchase',
                                                  password :'wendy0917',
                                                  database : 'peakchase'
                                                  });
            
            connection.connect();
            console.log("DB connected");
            
            var student_id=req.body.student_id;
            var student_name=req.body.student_name;
            
            console.log(student_id);
            console.log("\n");
            console.log(student_name);
            
            var insert_sql="insert into "+login_id+"_student(student_id, student_name) values('"+student_id+"','"+student_name+"');";
            
            var query = connection.query(insert_sql,function(err,result){
                            if(err) {
                                         res.render(err);
                            }else{
                                         res.redirect('1');
                            }
            });
            
            
            connection.end();
});
module.exports = router;
