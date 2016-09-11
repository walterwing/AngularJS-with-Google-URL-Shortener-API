"use strict";

function handleClientLoad() {
	var apisToLoad = 1; // must match number of calls to gapi.client.load()
	var gCallback = function() {
		if (--apisToLoad == 0) {
			// Manual bootstraping of the application
			var $injector = angular.bootstrap(document, [ 'demoApp' ]);
		}
	};

	gapi.load('client:auth2', gCallback);
}

(function () {
	
	var app = angular.module('demoApp', ['ngRoute', 'demoApp.wrapper']);
	
	app.config(function($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'app/home/home.html',
				controller: 'HomeController'
			})
			.when('/history', {
				templateUrl: 'app/history/history.html',
				controller: 'HistoryController'
			})
			.otherwise({redirectTo: '/'});
	})
	.config(['urlShortenerProvider', function(urlShortenerProvider) {
		// Enter an API key from the Google API Console:
		urlShortenerProvider.setApiKey('AIzaSyCq5fBz2eo3gBgCpVM_-CUu4OClLEe48ow');
		
		// Enter a client ID for a web application from the Google API Console:
	    // In your API Console project, add a JavaScript origin that corresponds
	    //   to the domain where you will be running the script.
		urlShortenerProvider.setClientId('961267305482-1jn71d0srltfk93l8gsin5pv1mib99ak.apps.googleusercontent.com');
		
		// Enter one or more authorization scopes. Refer to the documentation for
	    // the API or https://developers.google.com/identity/protocols/googlescopes
	    // for details.
		urlShortenerProvider.setScopes('https://www.googleapis.com/auth/urlshortener');
	}]);

})();





