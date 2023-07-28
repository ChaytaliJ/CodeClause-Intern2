//node server which will handle socket io connections
//http instance
const io = require('socket.io')(8000);

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    socket.join(name); // Join a room with the user's name as the room ID
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', data => {
    const { message, sender, receiver } = data;
    io.to(receiver).emit('receive', { message: message, name: sender });
  });

  socket.on('disconnect', () => {
    io.emit('left', users[socket.id]);
    delete users[socket.id];
  });
});