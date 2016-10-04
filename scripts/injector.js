define(function () {

	'use strict';

	function Injector() {

		this.container = {};

	}

	Injector.INSTANCE = 1;
	Injector.CACHE_INSTANCE = 2;
	Injector.FACTORY_FUNCTION = 3;
	Injector.VALUE = 4;


	function isObject(obj) {
		return Object.prototype.toString.call(obj) === '[object Object]';
	}

	function isString(str) {
		return typeof str === 'string' || str instanceof String;
	}

	Injector.prototype = {

		/**
		*
		*  mode can either be a string or an object
		*
		*
		*/
		register : function (key, injectable, mode) {

			this.container[key] = {
				injectable : injectable,
				mode : mode || Injector.INSTANCE
			};
		},

		/**
		*
		*
		*
		*/
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

			if(injectableConfig.mode === Injector.CACHE_INSTANCE) {
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
			    InjectableOptions = {},
			    result;

			Injectable = config.injectable;

			dependencies = Injectable.inject || [];

			dependencies.forEach(function (dependencyKey) {

				InjectableOptions[dependencyKey] = this.get(dependencyKey, keychain);

			}, this);

			switch(config.mode) {
			case Injector.INSTANCE:
			case Injector.CACHE_INSTANCE:
				result = new Injectable(InjectableOptions);
				break;
			case Injector.FACTORY_FUNCTION:
				result = Injectable(InjectableOptions);
				break;
			case Injector.VALUE:
				result = Injectable;
				break;
			}

			return result;

		},

		start : function (key, callback) {

			var injectable = this.get(key);

			callback(injectable);

		}


	};

	return Injector;


});