var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/mypage', function(req, res, next) {
           var login_id=global.login_id;
           res.render('mypage',{login_id:login_id});
});

module.exports = router;
