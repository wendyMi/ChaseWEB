var express = require('express');
var router = express.Router();
var mysql= require('mysql');

/* GET home page. */
router.get('/qna/:page', function(req, res, next) {
           
           var page=req.params.page;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                            host: 'localhost',
                            user: 'root',
                            password :'turing',
                            database : 'chase'
            });
           
           connection.connect();
           var show_sql='select question_no,question_title,question_id,question_done from qna';
           
           var query = connection.query(show_sql,function(err,rows){
                            if(err) {
                                        res.render(err);
                            }
                                        console.log(rows);
                                        res.render('qna',{login_id:login_id,rows: rows,page:page,leng:Object.keys(rows).length-1, page_num:10,pass: true});
            });
           
           
           connection.end();
});

module.exports = router;