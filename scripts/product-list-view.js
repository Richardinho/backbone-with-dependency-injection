define([
	'backbone'
	,'underscore'
], function (
	Backbone
	,_
) {

	'use strict';

	var ProductListView = Backbone.View.extend({

		initialize : function (options) {

			this.dataService = options.dataService;
			this.router = options.router;

		},

		events : {
			'click [data-internal]' : 'handleInternalLink'
		},

		handleInternalLink : function (event) {

			event.preventDefault();
			var url = event.target.getAttribute('href');
			this.router.navigate(url, { trigger : true });

		},

		Template : _.template(document.getElementById('plp-template').innerHTML),

		render : function () {

			this.el.innerHTML = this.Template({});

			return this;

		}
	});

	ProductListView.inject = ['dataService', 'router'];

	return ProductListView;

});