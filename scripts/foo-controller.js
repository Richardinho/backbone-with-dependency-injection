define(function () {

	'use strict';

	var FooController = function (options) {
		this.pageManager = options.pageManager;
		this.fooView = options.fooView;
		this.dataService = options.dataService;
	}

	FooController.prototype = {

		handleRequest : function () {
			this.dataService.fetchData().then(() => {

				this.pageManager.renderView(this.fooView.render());
			});
		}
	};

	FooController.inject = ['pageManager', 'fooView', 'dataService'];

	return FooController;

});