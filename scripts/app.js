define(['backbone'], function (Backbone) {

	'use strict';

	var App = function(options) {

		this.router = options.router;
		this.createController = options.createController;

		this.router.route('',     'foo',                 this.createController('fooController'));
		this.router.route('bar',  'bar',                 this.createController('barController'));

	}

	App.prototype = {

		start : function () {

			Backbone.history.start();
		}

	};

	App.inject = ['router', 'createController'];

	return App;

});