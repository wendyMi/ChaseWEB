var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
           global.id="";
           global.id_checked=0;
           console.log("global id : "+global.id);
  res.render('index');
});

module.exports = router;
