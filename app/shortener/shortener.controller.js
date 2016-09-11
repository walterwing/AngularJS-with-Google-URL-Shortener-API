(function () {
	'use strict';
    
	var app = angular.module('demoApp');
	
	app.controller('ShortenerController', ShortenerController);
	
	function ShortenerController($scope, urlShortener) {
		
		$scope.urlDetails = {
				signed: false,
				longUrl: '',
				shortUrl: ''
		}
		
		$scope.$watch(function() {
			return urlShortener.getUrlDetails(); 
		}, function(newVal){
			$scope.urlDetails = newVal;
		}, true);
		
		$scope.signIn = function signIn() {
			urlShortener.signIn();
		}
		
		$scope.invokeShorten = function invokeShorten(inputUrl) {
			urlShortener.shortenURL(inputUrl);
		}
		
		$scope.copyUrl = function copyUrl() {
			var copyTextarea = document.querySelector('#shortUrlDisplay');
			copyTextarea.select();

			try {
				document.execCommand('copy');
				/*var successful = document.execCommand('copy');
				var msg = successful ? 'successful' : 'unsuccessful';
				console.log('Copying text command was ' + msg);*/
			} catch (err) {
				console.log('failed to copy: ' + err);
			}
		}
		
		$scope.openUrl = function openUrl() {
			window.open($scope.urlDetails.shortUrl, '_blank');
		}
		
	}

	
})();