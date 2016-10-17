define(function () {

	'use strict';


	var DataService = function () {
		this.title = '';
		this.bar = 'This is bar blah blah';
		this.foo = 'This is foo blah blah';
	}

	DataService.prototype = {

		fetchData : function () {
			return new Promise((resolve, reject)  => {

				setTimeout(() => {

					this.title = 'My Dependency Injection prototype';
					this.bar = 'bar bar bar bar bar baran..';
					this.foo = 'Who is the bigger fool, the fool who leads or the fool who follows?'

					resolve({});


				}, 1000);
			});
		}


	};

	return DataService;


});