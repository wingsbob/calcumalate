(function () {
	'use strict';

	var EventEmitter = require('./eventEmitter');

	function Button (element, value) {
		this.element = element || null;
		this.value = value;
		EventEmitter.call(this);
	}

	Button.prototype = Object.create(EventEmitter.prototype);

	Button.prototype.init = function(eventListener) {
		eventListener.on('click', this.element, this);
	};

	Button.prototype.handleEvent = function(event) {
		this.emit(event.type, this.value);
	};

	module.exports = Button;
}());