const Express = require('express')
const Http = require('http')
const SocketIO = require('socket.io')
const {
    join
} = require('path')

const app = Express()

const server = Http.createServer(app)
app.use(Express.static(join(__dirname, '/')))
const io = SocketIO(server)
server.listen(3000, '0.0.0.0')

let message = [];

io.sockets.on('connection', socket => {
    console.log('alguem conectou!', socket.id);
    socket.emit('previusMessage', message);
    socket.on('sendMessage', data =>{
      message.push(data);
      socket.broadcast.emit('receiveMessage', data);
    });

    socket.on('disconnect', () => {
        console.log('alguem desconectou', socket.id)
    })
})
