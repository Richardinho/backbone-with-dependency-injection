define(function () {

	'use strict';

	function Injector() {

		this.container = {};

	}

	Injector.prototype = {

		register : function (key, injectable, mode) {

			var cached = mode && (mode === 'cached');

			this.container[key] = {
				injectable : injectable,
				cached : cached
			};

		},

		get : function (key) {

			var injectableConfig = this.container[key],
			    instance,
			    injectable;

			injectable = injectableConfig.injectable;

			if(injectableConfig.cached ) {
				if(injectableConfig.cachedInstance) {
					return injectableConfig.cachedInstance;
				} else {
					instance = this.createInstance(injectableConfig);
					injectableConfig.cachedInstance = instance;
				}
			} else {
				instance = this.createInstance(injectableConfig);
			}

			return instance;

		},

		createInstance : function (config) {

			var Constructor,
			    dependencies,
			    constructorOptions = {};

			Constructor = config.injectable;

			dependencies = Constructor.inject || [];


			dependencies.forEach(function (dependencyKey) {

				constructorOptions[dependencyKey] = this.get(dependencyKey);

			}, this);

			return new Constructor(constructorOptions);

		},

		start : function (key, callback) {

			var injectable = this.get(key);

			callback(injectable);

		}


	};

	return Injector;


});