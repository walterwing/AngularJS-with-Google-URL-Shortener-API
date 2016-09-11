(function () {
	'use strict';
    
	var app = angular.module('demoApp');
	
	app.controller('HomeController', HomeController);
	
	function HomeController($scope, urlShortener) {
		$scope.getGreeting = function getGreeting() {
			var name = urlShortener.getName();
			if ("Guest" === name) {
				return "Hello, Guest";
			}
			else {
				return "Welcome, " + name;
			}
		}
		
	}

	
})();