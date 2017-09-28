var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var async=require('async');

/* GET home page. */
router.get('/qna/read/:qna_no', function(req, res, next) {
           
           var login_id=global.login_id;
           var question_no=req.params.qna_no;
           
           var connection=mysql.createConnection({
                                                 host: '10.0.0.1',
                                                 port: '3306',
                                                 user: 'peakchase',
                                                 password :'wendy0917',
                                                 database : 'peakchase'
            });
           
           connection.connect();
           
           var show_sql="select question_no,question_title,user_id,question_text,question_answer from qna where question_no="+question_no;
           
           var query = connection.query(show_sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        console.log(rows);
                                        res.render('qna_read',{login_id:login_id,rows: rows});
                                        });
           
           connection.end();
});

/* Delete */
router.get('/qna/delete/:qna_no', function(req, res, next) {
           
           var question_no=req.params.qna_no;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                                 host: '10.0.0.1',
                                                 port: '3306',
                                                 user: 'peakchase',
                                                 password :'wendy0917',
                                                 database : 'peakchase'
                                                 });
           
           connection.connect();
           
           var delete_sql='delete from qna where question_no='+question_no;
           
           var query = connection.query(delete_sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        console.log("The row is deleted.");
                                        res.send('<script>location.href="/qna/1";</script>');
                                        });
           
           
           connection.end();
});

/* [GET] Update */
router.get('/qna/update/:qna_no', function(req, res, next) {
           
           var question_no=req.params.qna_no;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                                 host: '10.0.0.1',
                                                 port: '3306',
                                                 user: 'peakchase',
                                                 password :'wendy0917',
                                                 database : 'peakchase'
                                                 });
           
           connection.connect();
           
           var sql='select question_no,question_title,question_text from qna where question_no='+question_no;
           
           var query = connection.query(sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        var question_no=rows[0].question_no;
                                        var question_title=rows[0].question_title;
                                        var question_text=rows[0].question_text;
                                        
                                        res.render('qna_update',{login_id:login_id, question_no:question_no, question_title:question_title, question_text:question_text});
                                        });
           
           
           connection.end();
});

/* [POST] Update */
router.post('/qna/update/:qna_no', function(req, res) {
           
            console.log("<Update> POSTING...");
            
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                                 host: '10.0.0.1',
                                                 port: '3306',
                                                 user: 'peakchase',
                                                 password :'wendy0917',
                                                 database : 'peakchase'
                                                 });
           
           connection.connect();
            
            var question_no=req.body.question_no;
            var question_title=req.body.question_title;
            var question_text=req.body.question_text;
            
           var update_sql="update qna set question_title='"+question_title+"',question_text='"+question_text+"' where question_no="+question_no;
           
           var query = connection.query(update_sql,function(err,rows){
                        if(err) {
                                        res.render(err);
                        }else{
                                        console.log("The row is successfully changed.");
                                        res.send('<script>location.href="/qna/1";</script>');
                        }
            });
           
           
           connection.end();
});

module.exports = router;
