define([
	'backbone'
	,'injector'
	,'product-list-view'
	,'product-detail-view'
	,'plp-controller'
	,'pdp-controller'
	,'data-service'
	,'app'
	,'router'
	,'page-manager'
], function (
	Backbone
	,Injector
	,ProductListView
	,ProductDetailView
	,PlpController
	,PdpController
	,DataService
	,App
	,Router
	,PageManager
) {

	'use strict';

	return function bootstrap() {


		var injector = new Injector();

		injector.register('productListView', ProductListView);
		injector.register('productDetailView', ProductDetailView);
		injector.register('plpController', PlpController);
		injector.register('pdpController', PdpController);
		injector.register('dataService', DataService, 'cached');
		injector.register('router', Router, 'cached');
		injector.register('pageManager', PageManager, 'cached');
		injector.register('app', App);

		injector.start('app', function (app) {

			app.start();

		});

	}

});