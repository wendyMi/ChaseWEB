var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var async=require('async');

/* GET home page. */
router.get('/read/:mail_no', function(req, res, next) {
           
           var login_id=global.login_id;
           var mail_no=req.params.mail_no;
           
           var connection=mysql.createConnection({
                                                 host: '10.0.0.1',
                                                 port: '3306',
                                                 user: 'peakchase',
                                                 password :'wendy0917',
                                                 database : 'peakchase'
            });
           
           connection.connect();
           
           connection.beginTransaction();
           
           var count_sql="SELECT COUNT(*) as mail_count from "+login_id+"_mailbox where checked=0";
           
           var query1 = connection.query(count_sql,function(err,rows){
                                         if(err) {
                                         res.render(err);
                                         }
                                         console.log(rows[0].mail_count);
                                         global.mail_count=rows[0].mail_count;
                                         });
           
           var show_sql="select user_id,mail_title,mail_text from "+login_id+"_mailbox where mail_no="+mail_no;
           
           var query = connection.query(show_sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        console.log(rows);
                                        res.render('read',{login_id:login_id,mail_count:global.mail_count,rows: rows});
                                        });
           
           connection.commit();
           connection.end();
});

module.exports = router;
