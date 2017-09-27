var express = require('express');
var router = express.Router();
var mysql= require('mysql');

/* GET home page. */
router.get('/qna/:page', function(req, res, next) {
           
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
           var show_sql='select question_no,question_title,user_id,question_state from qna';
           
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
