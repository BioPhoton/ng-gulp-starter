//@TODO rename file into app.routing.js
;(function () {
	'use strict';

	angular.module('gulp-starter', [])
		.config(configFunction)
		.run(runFunction);

/////////////


	function runFunction() {

	}


	function configFunction() {
		//routing
		$urlRouterProvider.otherwise('/app/home');

		$stateProvider

			.state('app', {
				url: '/app',
				abstract: true,
				templateUrl: 'app/app.view.html',
				controller: 'AppController as app'
			})

			.state('app.home', {
				url: '/home',
				templateUrl: 'app/components/home/home.view.html',
				controller: 'HomeController as home'
			})
			;

	}


})();



