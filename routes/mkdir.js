var express = require('express');
var router = express.Router();
var mkdirp=require('mkdirp');

/* GET home page. */
router.get('/mkdir', function(req, res, next) {
           
           mkdirp('/hosting_users/peakchase/apps/peakchase_chase/testDir', function (err) {
                  if (err){
                    res.render(err);
                  }
                    console.log ('Success');
                  });
           
});

module.exports = router;
