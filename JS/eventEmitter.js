(function () {
	'use strict';

	function EventEmitter () {
		this.events = {};
	}

	EventEmitter.prototype.on = function(eventName, listener) {
		var eventsArray = this.events[eventName] || [],
			finalListener,
			error = null;

		if (listener === null) {
			error = new Error('listener cannot be null');
		} else if (typeof listener === 'object' && typeof listener.handleEvent === 'function') {
			finalListener = function (event) {
				listener.handleEvent(event);
			};
		} else if (typeof listener === 'function') {
			finalListener = listener;
		} else {
			error = new Error('listener is not valid');
		}

		if (error !== null) {
			throw error;
		}

		eventsArray.push(finalListener);
		this.events[eventName] = eventsArray;
	};

	module.exports = EventEmitter;
}());