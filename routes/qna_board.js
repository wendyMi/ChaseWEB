var express = require('express');
var router = express.Router();
var mysql= require('mysql');

/* GET home page. */
router.get('/qna_board', function(req, res, next) {
           var login_id=global.login_id;
           res.render('qna_board',{login_id:login_id});
});

/* POST home page. */
router.post('/qna_board', function(req, res) {
            
            
            console.log("Posting...");
            var connection=mysql.createConnection({
                      host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
                                                  });
            
            connection.connect();
            
            var question_title=req.body.question_title;
            var question_text=req.body.question_text;
            var login_id=global.login_id;
            
            var insert_question="insert into qna(question_title, question_text, user_id) values('"+question_title+"','"+question_text+"','"+login_id+"')";
            
            var query= connection.query(insert_question,function(err,result){
                        if(err) {
                                        res.render(err);
                        }else{
                                        console.log("success");
                                        res.redirect("qna/1");
                        }
            });
        
            connection.end();
});

module.exports = router;
