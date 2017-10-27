var express = require('express');
var router = express.Router();
var mysql=require('mysql');
var async=require('async');

/* GET home page. */
router.get('/join', function(req, res, next) {
           res.render('join',{id:global.id});
});

/* POST home page. */
router.post('/join',function(req,res){
           
    console.log("POSTING");
            
    var connection=mysql.createConnection({
      host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
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
        if(global.id_checked==1){
           if(pw!=confirm){
                res.send('<script>alert("비밀번호가 맞지 않습니다.");self.close();parent.location.replace("/join");</script>');
           }else{
            
                connection.beginTransaction();
                var query= connection.query('insert into chase_user set ?',new_user,function(err,result){
                            if(err) {
                                    res.send('<script>alert("이미 존재하는 아이디이거나 이메일입니다.");self.close();parent.location.replace("/join");</script>');
                            }else{
                                    console.log("insert success");
                            }
           });
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
           }
        }else{
            res.send('<script>alert("아이디 중복체크를 해주세요.");self.close();parent.location.replace("/join");</script>');
        }
           connection.end();

});

/* Confirm */
router.get('/join/confirm/:id',function(req,res,next){
           
           global.id=req.params.id;
           
           var connection=mysql.createConnection({
                                                host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
            });
           
           connection.connect();
           
           var confirm_sql="select count(*) as count from chase_user where user_id='"+id+"'";
           
           var query=connection.query(confirm_sql, function(err,rows){
                                      if(err){
                                      res.render(err);
                                      }
                                      if(rows[0].count==1){
                                        global.id="";
                                        global.id_checked=0;
                                        res.send('<script>alert("이미 존재하는 아이디입니다.");self.close();parent.location.replace("/join");</script>')
                                      }else{
                                        global.id_checked=1;
                                        res.send('<script>alert("사용가능한 아이디입니다.");self.close();location.href="/join";</script>');
                                      }
                                      });
           connection.end();
           });
module.exports = router;
