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

module.exports = router;
