(function() {
	'use strict';
	
	var app = angular.module('demoApp.wrapper', []);
	
	app.controller('NavController', NavController);
	function NavController($scope, urlShortener) {
		
		$scope.signInStatus = {
			signed: false
		}
		
		$scope.$watch(function() {
			return urlShortener.getUrlDetails(); 
		}, function(newVal){
			$scope.signInStatus.signed = newVal.signed;
		}, true);

		$scope.initAuth = function initAuth() {
			urlShortener.initAuth();
		}
		
		$scope.signIn = function signIn() {
			urlShortener.signIn();
		}
		
		$scope.signOut = function signOut() {
			urlShortener.signOut();
		}
	}
	
})();