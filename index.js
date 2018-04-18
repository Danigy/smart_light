const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config');

/**
 * Main route
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

/**
 * Открываем сокет
 */
io.on('connection', socket => {
    socket.on('message', msg => {
        console.log(msg);
        io.emit('message', msg);
    });
});

/**
 * Прослушиваем порт
 */
http.listen(config.port, () => {
    console.log('Server started *:' + config.port);
});