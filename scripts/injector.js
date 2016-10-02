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

			var factory = mode && (mode === 'factory');

			if(factory) {
				//  functions should always be cached
				this.container[key].cached = true;
				this.container[key].factory = true;
			}

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

			var Injectable,
			    dependencies,
			    InjectableOptions = {};

			Injectable = config.injectable;

			dependencies = Injectable.inject || [];

			dependencies.forEach(function (dependencyKey) {

				InjectableOptions[dependencyKey] = this.get(dependencyKey, keychain);

			}, this);

			if(config.factory) {

				return Injectable(InjectableOptions);

			} else {

				return new Injectable(InjectableOptions);

			}

		},

		start : function (key, callback) {

			var injectable = this.get(key);

			callback(injectable);

		}


	};

	return Injector;


});