(function () {
	'use strict';

	var EventEmitter = require('../JS/eventEmitter'),
		eventEmitterInstance;

	describe('eventEmitter', function () {
		describe('constructor', function () {
			it('should create an empty events object', function () {
				eventEmitterInstance = new EventEmitter();

				expect(eventEmitterInstance.events).toEqual({});
			})
		});

		describe('on', function () {
			beforeEach(function () {
				eventEmitterInstance = new EventEmitter();
			});

			it('should store the listener in an array of listeners for that event type', function () {
				eventEmitterInstance.on('click', function () {});

				expect(eventEmitterInstance.events.click).toContain(jasmine.any(Function));
			});
			it('should store multiple listeners', function () {
				eventEmitterInstance.events.click = ['someListener', 'anotherListener'];

				eventEmitterInstance.on('click', function () {});

				expect(eventEmitterInstance.events.click).toContain(jasmine.any(Function));
				expect(eventEmitterInstance.events.click).toContain('someListener');
			});
			it('should throw an error if the listener is not an event listener', function () {
				expect(function () {
					eventEmitterInstance.on('click', 'yetAnotherListener');
				}).toThrow();
			});
			it('should throw an error if the listener is not an event listener', function () {
				expect(function () {
					eventEmitterInstance.on('click', {});
				}).toThrow();
			});
		});

		describe('emit', function () {
			
		});
	});

}());