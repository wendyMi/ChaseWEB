var express = require('express');
var router = express.Router();
var mysql=require('mysql');

/* GET home page. */
router.get('/send', function(req, res, next) {
           
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                                     host: '10.0.0.1',
                        port: '3306',
                        user: 'peakchase',
                        password :'wendy0917',
                        database : 'peakchase'
                                                 });
           
           connection.connect();
           var mail_sql="SELECT COUNT(*) as mail_count from "+login_id+"_mailbox where checked=0";
           
           var query = connection.query(mail_sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        res.render('send',{login_id:login_id, mail_count:rows[0].mail_count});
                                        });
           
           
           connection.end();
});

/* POST home page. */
router.post('/send', function(req, res) {
            
            var login_id=global.login_id;
            
            console.log("Posting...");
            
            var connection=mysql.createConnection({
                            host: 'localhost',
                            user: 'root',
                            password :'turing',
                            database : 'chase'
            });
            
            connection.connect();
            
            var mail_to=req.body.mail_to;
            var mail_title=req.body.mail_title;
            var mail_text=req.body.mail_text;
            
            console.log(mail_to);
            var mail_send="insert into "+mail_to+"_mailbox(user_id, mail_title, mail_text) values('"+login_id+"','"+mail_title+"','"+mail_text+"')";
            
            var insert_query= connection.query(mail_send,function(err,result){
                                        if(err) {
                                        res.render(err);
                                        }else{
                                        console.log("insert success");
                                        res.redirect("mail/1");
                                        }
            });
            
            connection.end();
});

module.exports = router;
