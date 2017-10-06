var express = require('express');
var router = express.Router();
var mysql= require('mysql');

/* GET home page. */
router.get('/qna/answer/:qna_no', function(req, res, next) {
           
           var question_no=req.params.qna_no;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                            host: 'localhost',
                            user: 'root',
                            password :'turing',
                            database : 'chase'
            });
           
           connection.connect();
           var show_sql='select question_title,question_id,question_text,question_answer from qna where question_no='+question_no;
           
           var query = connection.query(show_sql,function(err,rows){
                            if(err) {
                                        res.render(err);
                            }
                                        var question_title=rows[0].question_title;
                                        var question_id=rows[0].question_id;
                                        var question_text=rows[0].question_text;
                                        var question_answer=rows[0].question_answer;
                                        
                                        res.render('qna_answer',{login_id:login_id,question_title:question_title, question_id:question_id, question_text:question_text,question_answer:question_answer});
            });
           
           
           connection.end();
});

/* GET home page. */
router.post('/qna/answer/:qna_no', function(req, res) {
           
           var question_no=req.params.qna_no;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                                 host: 'localhost',
                                                 user: 'root',
                                                 password :'turing',
                                                 database : 'chase'
                                                 });
           
           connection.connect();
            
            var question_answer=req.body.question_answer;
            
           var answer_sql="update qna set question_answer='"+question_answer+"',question_done=1 where question_no="+question_no;
           
           var query = connection.query(answer_sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        console.log(rows);
                                        res.send('<script>location.href="/qna/1";</script>');
                                        });
           
           
           connection.end();
});
module.exports = router;
