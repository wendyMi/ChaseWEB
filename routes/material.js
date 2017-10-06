var express = require('express');
var router = express.Router();
var mysql= require('mysql');

/* GET home page. */
router.get('/material/:stage/:page', function(req, res, next) {
           
           var page=req.params.page;
           var stage=req.params.stage;
           
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
   host: '10.0.0.1',
                                                  port: '3306',
                                                  user: 'peakchase',
                                                  password :'wendy0917',
                                                  database : 'peakchase'
                                                 });
           
           connection.connect();
           
           var material_sql='select material_no,material_title from material where story_no='+stage+' order by material_no desc';
           
           var query = connection.query(material_sql,function(err,rows){
                                        if(err) {
                                        res.render(err);
                                        }
                                        console.log(rows);
                                        res.render('material',{login_id:login_id,rows:rows,page:page,leng:Object.keys(rows).length-1, page_num:10,stage:stage});
                                        });
           
           
           connection.end();
});

/* GET read page */
router.get('/material/:material_no', function(req,res,next){
           
           console.log("Material Read Page loading...");
           var material_no=req.params.material_no;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                                  host: '10.0.0.1',
                                                  port: '3306',
                                                  user: 'peakchase',
                                                  password :'wendy0917',
                                                  database : 'peakchase'
            });
           
           connection.connect();
           var show_sql='select material_no, material_title, material_path, material_text from material where material_no='+material_no;
           
           var query=connection.query(show_sql, function(err, rows){
                                      if(err){
                                        res.render(err);
                                      }
                                      console.log(rows);
                                      var material_no=rows[0].material_no;
                                      var material_title=rows[0].material_title;
                                      var material_path=rows[0].material_path;
                                      var material_text=rows[0].material_text;
                                      
                                      res.render('material_read',{login_id:login_id, material_no:material_no, material_title:material_title,material_path:material_path, material_text:material_text});
                                      });
           
           connection.end();
           
});

/* UPDATE */
router.get('/materialedited/:material_no',function(req,res,next){
           
           console.log("Material Edited Loading...");
           var material_no=req.params.material_no;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                              host: '10.0.0.1',
                                                  port: '3306',
                                                  user: 'peakchase',
                                                  password :'wendy0917',
                                                  database : 'peakchase'
                                                 });
           
           connection.connect();
           
           //story_no은 이후에 jquery 처리할 것.
           var sql='select material_title, material_path, material_text from material where material_no='+material_no;
           var query= connection.query(sql, function(err,rows){
                                       if(err){
                                        res.render(err);
                                       }
                                       var material_title=rows[0].material_title;
                                       var material_path=rows[0].material_path;
                                       var material_text=rows[0].material_text;
                                       
                                       res.render('material_update',{login_id:login_id, material_title:material_title,material_path:material_path,material_text:material_text});
                                       
            });
           
           connection.end();
});

router.post('/materialedited/:material_no',function(req,res){
           
           console.log("Material Edited");
           var material_no=req.params.material_no;
           var login_id=global.login_id;
           
            var connection=mysql.createConnection({
                                             host: '10.0.0.1',
                                                  port: '3306',
                                                  user: 'peakchase',
                                                  password :'wendy0917',
                                                  database : 'peakchase'
                                                  });
            connection.connect();
            
            var story_no=req.body.story_no;
            var material_title=req.body.material_title;
            var material_path=req.body.material_path;
            var material_text=req.body.material_text;
            
            var update_sql="update material set story_no="+story_no+", material_title='"+material_title+"',material_path='"+material_path+"',material_text='"+material_text+"' where material_no="+material_no;
            var query=connection.query(update_sql, function(err,rows){
                                       if(err){
                                       res.render(err);
                                       }
                                       console.log("The row is successfully updated.");
                                       res.send('<script>location.href="/material/1/1";</script>');
                                       });
            
            connection.end();
});

/* DELETE */
router.get('/materialdeleted/:material_no',function(req,res,next){
           
           console.log("Material Edited");
           var material_no=req.params.material_no;
           var login_id=global.login_id;
           
           var connection=mysql.createConnection({
                                               host: '10.0.0.1',
                                                  port: '3306',
                                                  user: 'peakchase',
                                                  password :'wendy0917',
                                                  database : 'peakchase'
            });
           
           connection.connect();
           
           var delete_sql='delete from material where material_no='+material_no;
           
           var query=connection.query(delete_sql, function(err, rows){
                                      if(err){
                                      res.render(err);
                                      }
                                      console.log("The row is successfully deleted.");
                                      res.send('<script>location.href="/material/1/1";</script>');
                                      });
           connection.end();
           });
module.exports = router;
