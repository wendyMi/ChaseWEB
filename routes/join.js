var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var async=require('async');

/* GET home page. */
router.get('/join', function(req, res, next) {
  res.render('join');
});

/* POST home page. */
router.post('/join',function(req,res){
           
    console.log("POSTING");
            
    var connection=mysql.createConnection({
        host: '10.0.0.1',
        port: '3306',
        user: 'peakchase',
        password :'wendy0917',
        database : 'peakchase'
    });
           
    connection.connect();
           
    var id=req.body.id;
    var pw=req.body.pw;
    var confirm=req.body.confirm;
    var email=req.body.email;
    var gender=parseInt(req.body.gender);
    var birth_y=req.body.year;
    var birth_m=req.body.month;
    var birth_d=req.body.day;
    
            var birth=birth_y+birth_m+birth_d;
            console.log(birth);
            
    var nickname=id;
    var user_done=0;
       
    var new_user = {
        "user_id":id,
        "user_pw":pw,
        "user_email":email,
        "user_nickname":id,
        "user_birth":birth,
        "user_gender":gender,
        "user_process":user_done
    };
            
        console.log(new_user);
           
           if(pw!=confirm){
                res.send('<script>alert("비밀번호가 맞지 않습니다.");self.close();parent.location.replace("/join");</script>');
           }else{
            
                connection.beginTransaction();
            // 이 곳에서 로그인이 안됨!
                var query= connection.query('insert into chase_user set ?',new_user,function(err,result){
                            if(err) {
                                    res.send('<script>alert("이미 존재하는 아이디이거나 이메일입니다.");self.close();parent.location.replace("/join");</script>');
                            }else{
                                    console.log("insert success");
                            }
           });
           }
            
            var student_sql='CREATE TABLE '+id+'_student('
            +'no int auto_increment PRIMARY KEY,'
            +'student_id varchar(20) not null, student_name varchar(20) not null, Foreign key(student_id) references chase_user(user_id), unique(student_id))';
            
            var createStudent= connection.query(student_sql,function(err,rows){
                            if(err) {
                                             res.render(err);
                            }
                                             console.log("student table success");
            });
            
            var mail_sql='CREATE TABLE '+id+'_mailbox('
            +'mail_no int auto_increment PRIMARY KEY,'
            +'user_id varchar(20) not null,mail_title varchar(20),mail_text text,checked tinyint DEFAULT 0,'
            +'Foreign key(user_id) references chase_user(user_id))';
            
            var createStudent= connection.query(mail_sql,function(err,rows){
                            if(err) {
                                                res.render(err);
                            }
                                                res.redirect("login");
            });
            
           connection.commit();
            
           connection.end();

});
module.exports = router;
