var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

/* GET home page. */
router.get('/download/:filename', function(req, res, next) {
           
           var filename=req.params.filename;
           var savedpath='/c/nodejstest/upload';
           var file=savedpath+'/'+filename;
           
           res.setHeader('Content-disposition', 'attachment: filename'+filename);
           res.setHeader('Content-type','application/vnd.openxmlformats-officedocument.presentationml.presentation');
           var filestream=fs.createReadStream(file);
           filestream.pipe(res);
});

module.exports = router;
