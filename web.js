var http = require('http');
var express = require('express');

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(express.json());
app.use(express.urlencoded());

app.use(app.router);


app.get('/index', function (request, response) {
        
});


var port = process.env.port || 8001;
app.listen(port, function () {
           console.log("listening on " + port);
           });
