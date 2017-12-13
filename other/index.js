var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var iolist = []; //创建连接数组
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});
app.use(express.static(path.join(__dirname, './')));
//socket部分
io.on('connection', function (socket) {
    iolist.push(socket); //将新连接加入数组
    //接收并处理客户端的hi事件
    socket.on('msg', function (data) {
        //监听msg事件. 收到客户端发来的消息后
        console.log(data);
        //发给每个客户端
        sendAll(data);
    })

});

function sendAll(data) {
    for (var i in iolist) {
        //触发客户端accept事件.
        iolist[i].emit('accept',data);
    }
}


http.listen(5050, function () {
    console.log('listening on *:5050');
});
