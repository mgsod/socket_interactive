var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//监听新浪云(外网socket的消息)
var sinaClient = require('socket.io-client')('http://setting.applinzi.com/');
//监听本地5050端口socket
var localClient = require('socket.io-client')('http://localhost:5050');

//socket部分
io.on('connection', function (socket) {
    console.log('connection...')
    //接收并处理客户端的hi事件
    socket.on('msg', function (data) {
        //接受到转发的消息
        console.log('本地接受到消息:', data);
    })

});


http.listen(5050, function () {

    //接受外网socket发来的消息
    sinaClient.on('accept', function (data) {
        //触发内网msg事件 传入data消息
        localClient.emit('msg', data)
    })

});
