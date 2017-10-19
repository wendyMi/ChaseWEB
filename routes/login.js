var express = require('express');
var router = express.Router();
var mysql=require('mysql');

/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* POST home page. */
router.post('/login', function(req,res){
            
        var connection=mysql.createConnection({
                   host: '222.122.84.74',
        port: '3306',
        user: 'ckdal34',
        password :'wendy0917',
        database : 'ckdal34'
        });
        
        connection.connect();
        global.login_id=req.body.id;
        var login_pw=req.body.pw;
            
        var query = connection.query('select user_id,user_pw from chase_user where user_id=?',[login_id],function(err,rows){
                if(err) res.render(err);
                                         
                console.log(rows);
                                         
                var checkid=rows[0].user_id;
                var checkpw=rows[0].user_pw;
                                         
                if(login_pw==checkpw){
                        res.redirect('main');
                    }else{
                        res.send('<script>alert("비밀번호가 틀립니다."); location.href="/login";</script>');
                    }
        });
            
        connection.end();
        
});

module.exports = router;
