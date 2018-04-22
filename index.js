const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const SerialPost = require('serialport');
const StringDecoder = require('string_decoder').StringDecoder;
const Decoder = new StringDecoder('utf8');
const config = require('./config');

app.use('/assets', express.static(__dirname + '/public/assets'));

/**
 * Setup SerialPort
 * Raspberry - /dev/ttyUSB0
 */
const port = new SerialPost(config.portName, {
    baudRate: 9600,
});

/**
 * Точка входа
 */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

/**
 * Открываем сокет
 */
let isChecked = false;
io.on('connection', socket => {
    if (socket.connected) {
        io.emit('light_on', isChecked);
    }

    // port.on('data', (data) => {
    //     let json = JSON.parse(Decoder.write(data));
    //     let temperature = json['temperature'];
    //     io.emit('send_temperature', temperature);
    // });

    /**
     * Прослушиваем событие
     */
    socket.on('light_on', isOn => {
        isChecked = isOn;
        port.write(Number(isChecked).toString());
        io.emit('light_on', isChecked);
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