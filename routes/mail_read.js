var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var async=require('async');

/* GET home page. */
router.get('/mail/read/:mail_no', function(req, res, next) {
           
           var login_id=global.login_id;
           var mail_no=req.params.mail_no;
           
           var connection=mysql.createConnection({
                                                 host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
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

           var checked_sql="update "+login_id+"_mailbox set checked=1 where mail_no="+mail_no;

           var checked_query = connection.query(checked_sql,function(err,rows){
                                         if(err)
                                          res.render(err);
                                         });
           
           var show_sql="select mail_no,user_id,mail_title,mail_text from "+login_id+"_mailbox where mail_no="+mail_no;
           
           var query = connection.query(show_sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        console.log(rows);
                                        res.render('mail_read',{login_id:login_id,mail_count:global.mail_count,rows: rows});
                                        });
           
           connection.commit();
           connection.end();
});

/* Delete */
router.get('/mail/delete/:mail_no', function(req, res, next) {
           
           var mail_no= req.params.mail_no;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                                 host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
                                                 });
           
           connection.connect();
           
           var delete_sql="delete from "+login_id+"_mailbox where mail_no="+mail_no;
           
           var query = connection.query(delete_sql,function(err,rows){
                                         if(err) {
                                         res.render(err);
                                         }
                                         console.log("The row is deleted.");
                                         res.send('<script>location.href="/mail/1";</script>');
                                         });
           
           connection.end();
});

module.exports = router;
