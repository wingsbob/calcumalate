(function () {
	'use strict';

	var proxyquire = require('proxyquire'),
		fakeUtils = {},
		Events = proxyquire('../Events', {
			'./utils': fakeUtils,
			'@noCallThru': true
		}),
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
			var fakeElement,
				fakeListener;

			beforeEach(function () {
				fakeElement = {
					dataset: {}
				};
				fakeListener = {
					handleEvent: jasmine.createSpy()
				};
				eventsInstance = new Events();
				spyOn(window, 'addEventListener');
				fakeUtils.generateId = jasmine.createSpy().and.returnValue('unique id');
			});
			afterEach(function () {
				delete fakeUtils.generateId;
			});

			it('should add itself as an event listener on the window for the named event', function () {
				eventsInstance.addEvent('my-event', fakeElement, fakeListener);

				expect(window.addEventListener).toHaveBeenCalledWith('my-event', eventsInstance);
			});
			it('should record that it is now tracking the stated event', function () {
				eventsInstance.addEvent('my-event', fakeElement, fakeListener);

				expect(eventsInstance.trackedEvents).toContain('my-event');
			});
			it('should generate a unique id for the event', function () {
				eventsInstance.addEvent('my-event', fakeElement, fakeListener);

				expect(fakeUtils.generateId).toHaveBeenCalledWith();
			});
			it('should bind the handler to the element with the unique id', function () {
				eventsInstance.addEvent('my-event', fakeElement, fakeListener);

				expect(fakeElement.dataset['my-event']).toEqual('unique id');
			});
			it('should store the handler with the unique id and event type', function () {
				eventsInstance.addEvent('my-event', fakeElement, fakeListener);
				
				expect(eventsInstance.handlers).toEqual(jasmine.objectContaining({'my-event.unique id': fakeListener}));
			});
		});

		describe('handleEvent', function () {
			//Traverse DOM to find elements with the data attribute which matches the event type for a listener
			//Runs relevant code, then continues traversing the tree until we reach the window
		});
	});
}());