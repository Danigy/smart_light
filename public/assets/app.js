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
            this.setupChecked(this);
            this.renderMessage(this);
            this.renderTemperature(this);
        }

        /**
         * Проверка события
         */

    }, {
        key: 'setupChecked',
        value: function setupChecked(self) {
            var el = $('#id-name--1');
            $(el).on('click', function (e) {
                var isOn = $(el).prop('checked');
                self.socket.emit('light_on', isOn);
            });
        }
    }, {
        key: 'renderMessage',
        value: function renderMessage(self) {
            self.socket.on('light_on', function (isOn) {
                var el = $('input');
                if (isOn) {
                    $(el).addClass('active');
                } else {
                    $(el).removeClass('active');
                }
            });
        }
    }, {
        key: 'renderTemperature',
        value: function renderTemperature(self) {
            self.socket.on('send_temperature', function (data) {
                var el = $('#temperature');
                $(el).text(data);
            });
        }
    }]);

    return App;
}();