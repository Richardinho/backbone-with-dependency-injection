define(['scripts/injector'], function(Injector) {

		describe('injector', function() {

				var injector;

				beforeEach(function () {

						injector = new Injector();
				});

				describe('register()', function () {

						var key, injectable, mode;


						beforeEach(function () {
								key = 'foo';
								injectable = function Foo() {};
								mode = 'cached';

								injector.register(key, injectable, mode);
						});

						it('should should store injectables in container', function() {

							expect(injector.container[key]).toEqual({

								injectable : injectable,
								cached : true

							});
						});
				});

				describe('createInstance()', function () {

						var config,
								instance,
								keychain = [];

						describe('when Injectable is a constructor', function () {

								beforeEach(function () {

										//  Given

										function Injectable () { this.bar = 'bar' };

										config = {
												injectable : Injectable,
												cached : false
										};

										//  when
										instance = injector.createInstance(config, keychain);
								});

								it('should return an instance of the Injectable', function () {
										expect(instance.bar).toBe('bar');
								});
						});

						describe('when Injectable is a factory function', function () {

								beforeEach(function () {

										//  Given

										function Injectable () { return 'bar' };

										config = {
												injectable : Injectable,
												cached : false,
												factory : true
										};

										//  when
										instance = injector.createInstance(config, keychain);
								});

								it('should return result of calling factory function', function () {
										expect(instance).toBe('bar');
								});
						});

						describe('when Injectable has dependencies', function () {

								var apple, banana;

								beforeEach(function () {

										apple = function () { this.name = 'apple'; };
										banana = function () { this.name = 'banana'; };

										injector.register('apple', apple);
										injector.register('banana', banana);

								});

								describe('when Injectable is a constructor', function () {

										beforeEach(function () {

												//  Given

												apple = function () { this.name = 'apple'; };
												banana = function () { this.name = 'banana'; };

												injector.register('apple', apple);
												injector.register('banana', banana);

												function Injectable (options) { this.options = options; };

												Injectable.inject = ['apple', 'banana'];

												config = {
														injectable : Injectable,
														cached : false
												};

												//  when
												instance = injector.createInstance(config, keychain);
										});

										it('should return instance with injected dependencies', function () {
												expect(instance.options.apple.name).toBe('apple');
												expect(instance.options.banana.name).toBe('banana');
										});
								});

								describe('when Injectable is a factory function', function () {

										beforeEach(function () {

												//  Given

												function Injectable (options) { return options; };

												Injectable.inject = ['apple', 'banana'];

												config = {
														injectable : Injectable,
														cached : false,
														factory : true
												};

												//  when
												instance = injector.createInstance(config, keychain);
										});

										it('should return result of calling factory function and passing dependencies', function () {
												expect(instance.apple.name).toBe('apple');
												expect(instance.banana.name).toBe('banana');
										});
								});

						});
				});
		});
});