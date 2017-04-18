var io = require('kem/ws');

io.connect(function(socket){
	socket.on('add-user', function(id){
		socket.add(id)
	})

	socket.on('chat:join-room', function(room){
		socket.join(room)
	})

	socket.on('chat:send', function(data){
		// send all clients in a room
		// socket.in(data.room).emit('chat:send', data)

		// or send all clients
		io.emit('chat:send', data)
	})

	socket.on('chat:get-list', function(data, fn){
		// data: {room, newest_time, limit}
		var response_data = [];
		fn(response_data);
	})
});