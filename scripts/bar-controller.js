define(function () {

	'use strict';

	var BarController = function (options) {
		this.pageManager = options.pageManager;
		this.barView = options.barView;
		this.dataService = options.dataService;
	}

	BarController.prototype = {

		handleRequest : function () {
			this.dataService.fetchData().then(() => {
				this.pageManager.renderView(this.barView.render());
			})
		}
	};

	BarController.inject = ['pageManager', 'barView', 'dataService'];

	return BarController;

});