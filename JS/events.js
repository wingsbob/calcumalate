(function (win) {
	'use strict';

	var EventEmitter = require('./eventEmitter'),
		utils = require('./utils');

	function Events () {
		this.handlers = {};
		this.trackedEvents = [];
	}

	Events.prototype.on = function(eventType, element, listener) {
		var eventAdded = this.trackedEvents.indexOf(eventType) !== -1,
			eventEmitter,
			elementId;

		if (!eventAdded) {
			win.addEventListener(eventType, this, true);
			this.trackedEvents.push(eventType);
		}

		if (element) {
			elementId = element.dataset.elementId || utils.generateId();
			element.dataset.elementId = elementId;
		} else {
			elementId = 'global';
		}

		eventEmitter = this.handlers[elementId] || new EventEmitter();
		this.handlers[elementId] = eventEmitter;
		eventEmitter.on(eventType, listener);
	};

	module.exports = Events;
}(window));