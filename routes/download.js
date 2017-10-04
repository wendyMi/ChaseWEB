var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');


/* GET home page. */
router.get('/download/:filename', function(req, res, next) {
           
           var filename=req.params.filename;
           var ftype='sample.pptx';
           var savedpath='/home/hosting_users/peakchase/(root)upload'; //다운로드할 파일이 위치한 디렉터리의 경로
           var file=savedpath+'/'+filename;
           
           res.setHeader('Content-disposition', 'attachment: filename'+filename);
           res.setHeader('Content-type','application/zip');
           var filestream=fs.createReadStream(file);
           filestream.pipe(res);
           
           res.send('<script>location.href="/material/1/1"</script>');
});

module.exports = router;
