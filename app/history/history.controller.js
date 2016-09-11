(function () {
	'use strict';
    
	var app = angular.module('demoApp');
	
	app.controller('HistoryController', HistoryController);
	
	function HistoryController($scope, urlShortener) {
		$scope.urlDetails = {
				signed: false,
				longUrl: '',
				shortUrl: ''
		}
		
		$scope.urlHistory = [];
		
		$scope.$watch(function() {
			return urlShortener.getHistoryLength(); 
		}, function(newVal){
			$scope.urlHistory = urlShortener.getHistory();
		}, true);
		
		$scope.$watch(function() {
			return urlShortener.getUrlDetails(); 
		}, function(newVal){
			$scope.urlDetails = newVal;
		}, true);
		
		$scope.signIn = function signIn() {
			urlShortener.signIn();
		}
		
		$scope.loadHistory = function loadHistory() {
			urlShortener.loadHistory();
		}
		
	}

	
})();