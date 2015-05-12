(function () {
	'use strict';

	function sliceArguments (argumentsArray, offset) {
		var i,
			slicedArguments = [];

		for (i = offset; i < argumentsArray.length; i++) {
			slicedArguments.push(argumentsArray[i]);
		}

		return slicedArguments;
	}

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
			finalListener = function () {
				listener.handleEvent.apply(listener, arguments);
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

	EventEmitter.prototype.emit = function(eventType) {
		var listeners = this.events[eventType] || [],
			eventArguments = sliceArguments(arguments, 1),
			called = false,
			i;

		for (i = 0; i < listeners.length; i++) {
			listeners[i].apply(null, eventArguments);
			called = true;
		}

		return called;
	};

	module.exports = EventEmitter;
}());