const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const config = require('./config');

app.use('/assets', express.static(__dirname + '/public/assets'));

/**
 * Точка входа
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

/**
 * Открываем сокет
 */
io.on('connection', socket => {

    console.log('Device connected: ' + socket.connected);

    /**
     * Прослушиваем событие
     */
    socket.on('message', msg => {

        /**
         * Свое действие
         */
        console.log(msg);

        /**
         * Отправляем во front-end
         */
        io.emit('message', msg);
    });

    socket.on('disconnect', () => {
        console.log('Device is disconnected');
    });
});

/**
 * Прослушиваем порт
 */
http.listen(config.port, () => {
    console.log('Server started *:' + config.port);
});