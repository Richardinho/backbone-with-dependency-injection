define(['injector'], function (Injector) {

	var factory = function(options) {

		var injector = options.injector;

		return function createController(key) {

			return function handleRequest() {

				var instance;

				if(injector.has(key)) {

					instance = injector.get(key);
					instance.handleRequest();

				} else {
					throw error('no handler known');
				}
			};
		};
	};

	factory.inject = ['injector'];

	return factory;

});