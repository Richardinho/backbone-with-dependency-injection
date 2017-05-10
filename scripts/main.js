requirejs.config({

	paths : {
		'backbone' : 'https://cdnjs.cloudflare.com/ajax/libs/backbone.js/1.3.3/backbone-min.js',
		'underscore' : 'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
		'jquery' : 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js',
		'injector' : '../lib/injector'
	}

});


require(['bootstrap'], function (bootstrap) {

	bootstrap();

});