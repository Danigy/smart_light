'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
    function App() {
        _classCallCheck(this, App);

        this.socket = io();
    }

    /**
     * Инициализация методов
     */


    _createClass(App, [{
        key: 'init',
        value: function init() {
            this.submitMessage(this);
            this.renderMessage(this);
        }

        /**
         * Отправка сообщения
         */

    }, {
        key: 'submitMessage',
        value: function submitMessage(self) {
            $('form').on('submit', function () {
                self.socket.emit('message', $('input').val());
                $('input').val('');
                return false;
            });
        }
    }, {
        key: 'renderMessage',
        value: function renderMessage(self) {
            self.socket.on('message', function (msg) {
                $('#messages').append($('<li>').text(msg));
            });
        }
    }]);

    return App;
}();