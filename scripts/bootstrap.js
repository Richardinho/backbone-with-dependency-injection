define([
	'backbone'
	,'injector'
	,'data-service'
	,'app'
	,'router'
	,'page-manager'
	,'foo-view'
	,'bar-view'
	,'handle-internal-link'
	,'create-controller'
	,'foo-controller'
	,'bar-controller'
], function (
	Backbone
	,Injector
	,DataService
	,App
	,Router
	,PageManager
	,FooView
	,BarView
	,handleInternalLink
	,createController
	,FooController
	,BarController
) {

	'use strict';

	return function bootstrap() {


		var injector = new Injector();

		injector.register('dataService',        DataService,          Injector.CACHE_INSTANCE     );
		injector.register('router',             Router,               Injector.CACHE_INSTANCE     );
		injector.register('pageManager',        PageManager,          Injector.CACHE_INSTANCE     );
		injector.register('app',                App    ,              Injector.INSTANCE           );
		injector.register('handleInternalLink', handleInternalLink ,  Injector.FACTORY_FUNCTION   );
		injector.register('createController',   createController ,    Injector.FACTORY_FUNCTION   );
		injector.register('injector',           injector,             Injector.VALUE              );
		injector.register('fooController',      FooController,        Injector.INSTANCE           );
		injector.register('barController',      BarController,        Injector.INSTANCE           );
		injector.register('fooView',            FooView,              Injector.INSTANCE           );
		injector.register('barView',            BarView,              Injector.INSTANCE           );

		injector.start('app', function (app) {

			app.start();

		});

	}

});