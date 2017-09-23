var http = require('http');
http.createServer(function (req,res){
res.writeHead(200, {'Content-Type': 'text/plain'});
res.end('hello World');
}).listen(8001);
console.log('Server running at Cafe24');
