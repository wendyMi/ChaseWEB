var port = process.env.port || 8001;

app.listen(port, function () {
           console.log("listening on " + port);
           });

var pool= mysql.createPool(client);
function keepAlive(){
    pool.getConnection(function(err, connection){
                       if(err) { return; }
                       connection.release();
                       });
}
setInterval(keepAlive, 60*1000);
