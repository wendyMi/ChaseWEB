var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var async = require('async');

/* GET home page. */
router.get('/user_info', function(req, res, next) {
           
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                                     host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
                                                 });
           
           connection.connect();
           
           var sql="select user_nickname from chase_user where user_id='"+login_id+"'";
           
           var query = connection.query(sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        var user_nickname=rows[0].user_nickname;
                                        res.render('user_info',{login_id:login_id,user_nickname:user_nickname});
            });
           
           
           connection.end();
});

/* POST home page. */
router.post('/user_info', function(req, res){
            
            console.log("Posting...");
            
            var login_id=global.login_id;
            
            var connection=mysql.createConnection({
                                                 host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
                                                  });
            
            connection.connect();
            console.log("DB connected");

            connection.beginTransaction();
            
            var user_pw=req.body.user_pw;
            var user_confirm=req.body.user_confirm;
            var user_nickname=req.body.user_nickname;
            
            console.log("user_pw : "+user_pw);
            console.log("user_confirm : "+user_confirm);
            console.log("user_nickname : "+user_nickname);
            
            if(user_pw!=""&&user_confirm==""||user_pw!=user_confirm){
                res.send('<script>alert("비밀번호가 다릅니다.");self.close();parent.location.replace("/user_info");</script>');
            }
            
            if(user_pw==user_confirm&&user_pw!=""){
                    var change_pw_sql="UPDATE chase_user SET user_pw = '"+user_pw+"' WHERE user_id = '"+login_id+"'";
            
                        var query1 = connection.query(change_pw_sql,function(err,result){
                                         if(err) {
                                                     res.render(err);
                                         }else{
                                                     console.log("Password is changed.");
                                }
                        });
            
            }
            
            if(user_nickname!=""){
                    var change_nickname_sql="UPDATE chase_user SET user_nickname = '"+user_nickname+"' WHERE user_id = '"+login_id+"'";
            
                        var query2 = connection.query(change_nickname_sql,function(err,result){
                                         if(err) {
                                         res.render(err);
                                         }else{
                                         console.log("Nickname is changed.");
                                }
                        });
            
            }
            
            res.redirect('mypage');
            
            connection.commit();
            connection.end();
});

module.exports = router;
