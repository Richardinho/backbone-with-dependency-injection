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

		get : function (key, keychain) {

			var injectableConfig = this.container[key],
			    instance,
			    injectable;

			keychain = (keychain || []).slice();

			if(keychain.indexOf(key) != -1) {

				throw Error('cyclical dependency detected for key: ' + key + ' in keychain ' + keychain);

			} else {

				keychain.unshift(key);

			}

			if(!injectableConfig) {
				throw Error('non existent injectable: ' + key);
			}

			injectable = injectableConfig.injectable;

			if(injectableConfig.cached ) {
				if(injectableConfig.cachedInstance) {
					return injectableConfig.cachedInstance;
				} else {
					instance = this.createInstance(injectableConfig, keychain);
					injectableConfig.cachedInstance = instance;
				}
			} else {
				instance = this.createInstance(injectableConfig, keychain);
			}

			return instance;

		},

		createInstance : function (config, keychain) {

			var Constructor,
			    dependencies,
			    constructorOptions = {};

			Constructor = config.injectable;

			dependencies = Constructor.inject || [];


			dependencies.forEach(function (dependencyKey) {

				constructorOptions[dependencyKey] = this.get(dependencyKey, keychain);

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