var http = require('http');
var express = require('express');
var mysql = require('mysql');

// 데이터베이스와 연결합니다.
/**
var client = mysql.createConnection({
                                    host: '10.0.0.1',
                                    user : 'jhc9639',
                                    password : 'PASSWORD',
                                    database : 'jhc9639'
                });

 **/
// 웹 서버를 생성합니다.

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
