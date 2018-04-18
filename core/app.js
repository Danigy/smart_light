class App {
    constructor() {
        this.socket = io()
    }

    /**
     * Инициализация методов
     */
    init() {
        this.submitMessage(this);
        this.renderMessage(this);
    }

    /**
     * Отправка сообщения
     */
    submitMessage(self) {
        $('form').on('submit', () => {
            self.socket.emit('message', $('input').val());
            $('input').val('');
            return false;
        });   
    }

    renderMessage(self) {
        self.socket.on('message', msg => {
            $('#messages').append($('<li>').text(msg));
        });
    }
}