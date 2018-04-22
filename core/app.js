class App {
    constructor() {
        this.socket = io();
        this.isChecked = false;
    }

    /**
     * Инициализация методов
     */
    init() {
        this.socket.on('light_on', isOn => {
            self.isChecked = isOn;
        });

        if (annyang) {
            var commands = {
                'hello': function() { alert('Hello world!'); }
            }; 

            // Add our commands to annyang 
            annyang.addCommands(commands);
            
            // Start listening. 
            annyang.start();

        }

        this.setupChecked(this);
        this.renderMessage(this);
        this.renderTemperature(this);
    }
    
    /**
     * Проверка события
     */
    setupChecked(self) {
        let el = $('#id-name--1');
        $(el).on('click', (e) => {
            let isOn = $(el).prop('checked');
            self.socket.emit('light_on', isOn);
        });
    }

    renderMessage(self) {
        let el = $('#id-name--1');
        if (self.isChecked) {
            $(el).prop('checked', true);
            $(el).addClass('active');
        } else {
            $(el).prop('checked', false);
            $(el).removeClass('active');
        }
    }

    renderTemperature(self) {
        self.socket.on('send_temperature', data => {
            let el = $('#temperature');
            $(el).text(data);
        });
    }
}