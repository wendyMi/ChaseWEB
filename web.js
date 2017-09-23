
var app = require('../app');
var http = require('http');
var debug = require('debug')('chase:server');
var port = process.env.port || 8001;

app.listen(port, function () {
           console.log("listening on " + port);
           });
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    
    var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
    
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    debug('Listening on ' + bind);
}


var pool= mysql.createPool(client);
function keepAlive(){
    pool.getConnection(function(err, connection){
                       if(err) { return; }
                       connection.release();
                       });
}
setInterval(keepAlive, 60*1000);
