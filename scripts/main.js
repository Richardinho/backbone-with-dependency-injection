requirejs.config({

	paths : {
		'backbone' : '../node_modules/backbone/backbone',
		'underscore' : '../node_modules/underscore/underscore',
		'jquery' : '../node_modules/jquery/dist/jquery'
	}

});


require(['bootstrap'], function (bootstrap) {

	bootstrap();

});