// 引入http模块
var http=require('http');

// 创建一个服务器
server=http.createServer(handle)

// 引入mime模块
var mime=require('mime');
// 引入socket.io模块并绑定到服务器
var fs=require('fs');
var io=require('socket.io')(server)
function handle(req,res){
	var filePath='';
	if(req.url=='/'){
		filePath='./test.html'
	}else{
		send404(res);
	}
	serverStatic(res,filePath)
}

function serverStatic(res,filePath){
	fs.exists(filePath,function(exists){
		if(exists){
			fs.readFile(filePath,function(err,data){
				if(err){
					return;
				}
				res.writeHead(200,{
					"Content-Type":mime.lookup(filePath)
				})
				res.end(data);
			})
		}else{
			send404(res);
		}
	})
}

function send404(res){
	res.writeHead(404,{
		"Content-Type":"text/plain"
	})
	res.end('404!sorry,你的访问有问题哦')
}

// socket部分
io.on('connection',function(socket){
	// 接受并处理客户端发送的message事件
	socket.on('message',function(data){
		console.log(data);
		var text=data.info
		// socket.broadcast.emit('news',{text:text});
		io.sockets.emit('news',{text:text});

	})
})

// 监听5000 端口
server.listen(3001,function(){
	console.log('666666');
})