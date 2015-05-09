(function () {
	'use strict';

	var Events = require('../Events'),
		eventsInstance;

	describe('Events', function () {
		describe('constructor', function () {
			it('should create an empty handlers object', function () {
				eventsInstance = new Events();

				expect(eventsInstance.handlers).toEqual({});
			});
			it('should create an empty trackedEvents array', function () {
				eventsInstance = new Events();

				expect(eventsInstance.trackedEvents).toEqual([]);
			});
		});

		describe('addEvent', function () {
			var fakeElement;

			beforeEach(function () {
				fakeElement = {
					dataset: {}
				};
				eventsInstance = new Events();
				spyOn(window, 'addEventListener');
			});

			it('should add itself as an event listener on the window for the named event', function () {
				eventsInstance.addEvent('my-event', fakeElement);

				expect(window.addEventListener).toHaveBeenCalledWith('my-event', eventsInstance);
			});
			it('should record that it is now tracking the stated event', function () {
				eventsInstance.addEvent('my-event', fakeElement);

				expect(eventsInstance.trackedEvents).toContain('my-event');
			});
			it('should bind the handler to the element', function () {
				eventsInstance.addEvent('my-event', fakeElement);

				expect(fakeElement.dataset['my-event']).toEqual();
			})
		});

		describe('handleEvent', function () {
			
		});
	});
}());