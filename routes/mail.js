var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var async=require('async');

/* GET home page. */
router.get('/mail/:page', function(req, res, next) {
           
           var page= req.params.page;
           var login_id=global.login_id;
           
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
           
           var mail_sql="SELECT mail_no, user_id, mail_title from "+login_id+"_mailbox order by mail_no desc";
           
           var query2 = connection.query(mail_sql,function(err,rows){
                                         if(err) {
                                         res.render(err);
                                         }
                                         res.render('mail',{login_id:login_id,mail_count:global.mail_count, rows: rows,page:page,leng:Object.keys(rows).length-1, page_num:10,pass: true});
                                         });
           connection.commit();
           
           connection.end();
});


module.exports = router;
