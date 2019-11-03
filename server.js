
var cluster = require('cluster');
if (cluster.isMaster) {
  cluster.fork();

  cluster.on('exit', function(worker, code, signal) {
    cluster.fork();
  });
}
// เมื่อตายแล้ว ไม่ทำให้ node พัง
// หรือไม่ต้องให้รันใหม่
if (cluster.isWorker) {
  
    var express = require("express")
    var bodyParser = require("body-parser")
    
    var usersrouter = require("./router/users-module")
    var app = express()
    var cors = require('cors');
    
    const hostname = 'kittipong.com';
    const port = 9999;
    app.use(bodyParser.json({
        extended: true
    }))
    app.use(cors());
    app.options('*', cors());
    
    app.get("/", function (req, res) {
        res.send(`
            <link href="https://fonts.googleapis.com/css?family=Quicksand:700" rel="stylesheet">
            <div style="display: flex;flex-direction: column; justify-content: center; align-items: center; height: 100vh; font-family: 'Quicksand', san-serif;">
          <h1>Node.js with <a href="https://now.sh">Now</a></h1>
          <p>See more : <a href="https://devahoy.com/blog/2018/02/deploy-website-with-now/">มา Deploy Website แบบไม่เสียตังด้วย Now กันเถอะ</a></p>
        </div>
        `)
    })
    // one url multi medthod
    app.use("/api", [usersrouter])
    app.use(function (req, res, error) {
        res.end("Page not found 5555");
    })
    var server = app.listen(port, function () {
        console.log("Server running@ " + hostname + ":" + port);
    })

}