(function () {
	'use strict';

	var fakeEventEmitter = jasmine.createSpy(),
		proxyquire = require('proxyquire'),
		buttonInstance,
		Button = require('../JS/Button');

	describe('button', function () {
		afterEach(function () {
			fakeEventEmitter.calls.reset();
		});

		describe('constructor', function () {
			it('should store the element the button corresponds to', function () {
				buttonInstance = new Button('element');

				expect(buttonInstance.element).toEqual('element');
			});
			it('should store the value of the button', function () {
				buttonInstance = new Button('element', 'buttonValue');

				expect(buttonInstance.value).toEqual('buttonValue');
			});
			it('should call the event emitter constructor with correct arguments', function () {
				buttonInstance = new Button('the arguments');

				expect(fakeEventEmitter.calls.mostRecent().args).toEqual([]);
			});
			it('should call the event emitter constructor with correct arguments', function () {
				buttonInstance = new Button('the arguments');

				expect(fakeEventEmitter.calls.mostRecent().obj).toEqual(buttonInstance);
			});
		});

		describe('init', function () {
			var fakeEventInstance;

			beforeEach(function () {
				buttonInstance = new Button();
				buttonInstance.element = 'the button element';
				fakeEventInstance = {
					on: jasmine.createSpy()
				};
			});

			it('should register the button as a click listener on the button\'s element', function () {
				buttonInstance.init(fakeEventInstance);

				expect(fakeEventInstance.on).toHaveBeenCalledWith('click', 'the button element', buttonInstance);
			});
		});

		describe('handleEvent', function () {
			var fakeEvent;

			beforeEach(function () {
				fakeEvent = {
					type: 'funky event type'
				};
				buttonInstance = new Button();
				buttonInstance.emit = jasmine.createSpy();
			});

			it('should pass it\'s value to the event emitter', function () {
				buttonInstance.value = 'the button value';

				buttonInstance.handleEvent('myEvent');

				expect(buttonInstance.emit).toHaveBeenCalledWith('funky event type', 'the button value');
			});
		});
	});
});