(function umd(root, factory) {
  /* eslint-disable func-names  */
  /* eslint-disable no-undef  */
  /* eslint-disable prefer-arrow-callback */
  /* eslint-disable no-return-assign */
  /* eslint-disable no-param-reassign */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(function () {
      return (root.returnExportsGlobal = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.Diogenes = factory();
  }
}(this, function () {
  function Injector() {
    this.container = {};
  }

  Injector.INSTANCE = 1;
  Injector.CACHE_INSTANCE = 2;
  Injector.FACTORY_FUNCTION = 3;
  Injector.VALUE = 4;

  Injector.prototype = {

    /*
     *  mode can either be a string or an object
     */

    register(key, injectable, mode, locals) {
      this.container[key] = {
        injectable,
        mode: mode || Injector.INSTANCE,
        locals: locals || [],
      };
    },

    has(key) {
      return !!this.container[key];
    },

    get(key, keychain) {
      const injectableConfig = this.container[key];
      let instance;

      keychain = (keychain || []).slice();

      if (keychain.indexOf(key) !== -1) {
        throw Error(`cyclical dependency detected for key: ${key} in keychain ${keychain}`);
      } else {
        keychain.unshift(key);
      }

      if (!injectableConfig) {
        throw Error(`non existent injectable: ${key}`);
      }

      if (injectableConfig.mode === Injector.CACHE_INSTANCE) {
        if (injectableConfig.cachedInstance) {
          instance = injectableConfig.cachedInstance;
        } else {
          instance = this.createInstance(injectableConfig, keychain);
          injectableConfig.cachedInstance = instance;
        }
      } else {
        instance = this.createInstance(injectableConfig, keychain);
      }

      return instance;
    },

    createInstance(config, keychain) {
      const InjectableOptions = {};
      const Injectable = config.injectable;
      const dependencies = Injectable.inject || [];
      let result;

      dependencies.forEach(function (dependencyKey) {
        InjectableOptions[dependencyKey] = this.get(dependencyKey, keychain);
      }, this);

      switch (config.mode) {
        case Injector.INSTANCE:
        case Injector.CACHE_INSTANCE:
          result = new Injectable(InjectableOptions, config.locals);
          break;
        case Injector.FACTORY_FUNCTION:
          result = Injectable(InjectableOptions, config.locals);
          break;
        case Injector.VALUE:
          result = Injectable;
          break;
        default:
          // do nothing
      }

      return result;
    },

    start(key, callback) {
      const injectable = this.get(key);
      callback(injectable);
    },
  };

  return Injector;
}));
