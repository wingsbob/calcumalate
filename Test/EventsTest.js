(function () {
	'use strict';

	var proxyquire = require('proxyquire'),
		fakeEventEmitter = jasmine.createSpy(),
		fakeUtils = {},
		Events = proxyquire('../JS/Events', {
			'./utils': fakeUtils,
			'./eventEmitter': fakeEventEmitter,
			'@noCallThru': true
		}),
		eventsInstance;

	describe('Events', function () {
		afterEach(function () {
			fakeEventEmitter.calls.reset();
		});

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

		describe('on', function () {
			var fakeElement,
				fakeEventEmitterInstance,
				fakeListener;

			beforeEach(function () {
				fakeElement = {
					dataset: {}
				};
				fakeListener = {
					handleEvent: jasmine.createSpy()
				};
				fakeEventEmitterInstance = {
					on: jasmine.createSpy()
				};
				fakeEventEmitter.and.returnValue(fakeEventEmitterInstance);
				eventsInstance = new Events();
				spyOn(window, 'addEventListener');
				fakeUtils.generateId = jasmine.createSpy().and.returnValue('unique id');
			});
			afterEach(function () {
				delete fakeUtils.generateId;
			});

			it('should add itself as an event listener on the window for the named event', function () {
				eventsInstance.on('my-event', fakeElement, fakeListener);

				expect(window.addEventListener).toHaveBeenCalledWith('my-event', eventsInstance, true);
			});
			it('should record that it is now tracking the stated event', function () {
				eventsInstance.on('my-event', fakeElement, fakeListener);

				expect(eventsInstance.trackedEvents).toContain('my-event');
			});
			it('should generate a unique id for the element if none already exists', function () {
				eventsInstance.on('my-event', fakeElement, fakeListener);

				expect(fakeUtils.generateId).toHaveBeenCalledWith();
			});
			it('should not generate a unique id for the element if one already exists', function () {
				fakeElement.dataset.elementId = 'some existing id';
				eventsInstance.on('my-event', fakeElement, fakeListener);

				expect(fakeUtils.generateId).not.toHaveBeenCalledWith();
			});
			it('should bind the handler to the element with the unique id', function () {
				eventsInstance.on('my-event', fakeElement, fakeListener);

				expect(fakeElement.dataset.elementId).toEqual('unique id');
			});
			describe('when there is no existing eventEmitter for that element', function () {
				it('should create a new eventEmitter if none exists for that element id', function () {
					eventsInstance.on('my-event', fakeElement, fakeListener);

					expect(fakeEventEmitter).toHaveBeenCalledWith();
				});
				it('should register an event with the new events emitter', function () {
					eventsInstance.on('my-event', fakeElement, fakeListener);

					expect(fakeEventEmitterInstance.on).toHaveBeenCalledWith('my-event', fakeListener)
				});
				it('should store the events emitter under the elementId', function () {
					fakeUtils.generateId.and.returnValue('element id');
					eventsInstance.on('my-event', fakeElement, fakeListener);
					
					expect(eventsInstance.handlers).toEqual(jasmine.objectContaining({'element id': fakeEventEmitterInstance}));
				});
			});
			describe('when there is an existing eventEmitter for that element', function () {
				beforeEach(function () {
					fakeElement.dataset.elementId = 'existingId';
					eventsInstance.handlers.existingId = {on: jasmine.createSpy()};
				});

				it('should not create a new eventEmitter if one already exists for that element id', function () {
					eventsInstance.on('my-event', fakeElement, fakeListener);

					expect(fakeEventEmitter).not.toHaveBeenCalledWith();
				});
				it('should register an event with the existing emitter', function () {
					eventsInstance.on('my-event', fakeElement, fakeListener);

					expect(eventsInstance.handlers.existingId.on).toHaveBeenCalledWith('my-event', fakeListener);
				});
			});
		});

		describe('handleEvent', function () {
			beforeEach(function () {
				eventsInstance = new Events();
			});
			//Traverse DOM to find elements with the data attribute which matches the event type for a listener
			//Runs relevant code, then continues traversing the tree until we reach the window
		});
	});
}());