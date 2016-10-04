define(['scripts/injector'], function(Injector) {

	describe('injector acceptance test', function() {

		var injector,
		    spyOnStart,
		    spyOnBixCallFunction;

		beforeEach(function () {

			injector = new Injector();

			spyOnStart = jasmine.createSpy('spy-on-start');
			spyOnBixCallFunction = jasmine.createSpy('spy-on-bix-call-function');

			function Bix() {
				this.callFunction = spyOnBixCallFunction;
			}

			function Bar(options) {
				this.bix = options.bix;
				this.callFunction = function () {
					this.bix.callFunction();
				};
			}

			Bar.inject = ['bix'];

			function App(options) {
				this.bar = options.bar;
				this.bar.callFunction();
				this.start = spyOnStart;
			}

			App.inject = ['bar'];

			injector.register('app', App);
			injector.register('bar', Bar);
			injector.register('bix', Bix);
			injector.start('app', function (app) {
				app.start();
			});
		});

		it('should create dependencies and start application', function () {
			expect(spyOnStart).toHaveBeenCalled();
			expect(spyOnBixCallFunction).toHaveBeenCalled();
		});
	});
});
