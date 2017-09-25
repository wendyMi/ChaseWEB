var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/main', function(req, res, next) {
           
           var login_id=global.login_id;
           res.render('main',{login_id:login_id});
});

module.exports = router;
