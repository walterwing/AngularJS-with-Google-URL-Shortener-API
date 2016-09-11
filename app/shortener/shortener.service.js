(function() {
	'use strict';

	var app = angular.module('demoApp');

	app.provider('urlShortener', urlShortenerProvider);

	function urlShortenerProvider() {
		
		var urlDetails = {
			signed: false,
			longUrl: "",
			shortUrl: ""
		};
		
		var urlHistory = [];
		
		var myAuth;

		var apiKey = '';
		var clientId = '';
		var scopes = '';

		this.setApiKey = function(value) {
			apiKey = value;
		}

		this.setClientId = function(value) {
			clientId = value;
		}

		this.setScopes = function(value) {
			scopes = value;
		}

		this.$get = ["$http", "$rootScope", function($http, $rootScope) {
			
			return {
				
				initAuth : function() {
					gapi.client.setApiKey(apiKey);
					gapi.auth2.init({
						client_id : clientId,
						scope : scopes
					}).then(function() {
						var auth = gapi.auth2.getAuthInstance();

						storeAuth(auth);

						// Listen for sign-in state changes.
						auth.isSignedIn.listen(updateSigninStatus);

						// Handle the initial sign-in state.
						updateSigninStatus(auth.isSignedIn.get());
					});
				},

				signIn : function() {
					myAuth.signIn();
				},

				signOut : function() {
					myAuth.signOut();
				},
				
				getName : function() {
					if (urlDetails.signed) {
						return myAuth.currentUser.get().getBasicProfile().getGivenName();
					}
					else {
						return "Guest";
					}
					
				},

				shortenURL : function(inputUrl) {
					if (urlDetails.signed) {
						makeAuthCall(inputUrl);
					} else {
						makePlainCall(inputUrl);
					}
				},
				
				getUrlDetails: function() {
					return urlDetails;
				},
				
				loadHistory : function() {
					if (urlDetails.signed) {
						listAllUrls();
					} else {
						console.log("You need to sing in first.");
					}
				},
				
				getHistoryLength : function() {
					return urlHistory.length;
				},
				
				getHistory : function() {
					return urlHistory;
				}

			}
			
			function updateSigninStatus(isSignedIn) {
				$rootScope.$apply(function(){
					// remove shortened URL to avoid confusion for the user
					urlDetails.shortUrl = '';
					
					if (isSignedIn) {
						urlDetails.signed = true;
					} else {
						urlDetails.signed = false;
					}
				})
			}

			function makePlainCall(inputUrl) {
				$http.post('https://www.googleapis.com/urlshortener/v1/url?key=' + apiKey,  { 'longUrl' : inputUrl })
					.then(function(response) {
						urlDetails.shortUrl = response.data.id;
					});
			}
			
			function makeAuthCall(inputUrl) {
				// $http.post('https://content.googleapis.com/urlshortener/v1/url?key=' + apiKey, { 'longUrl' : 'www.nba.com' });
				gapi.client.load('urlshortener', 'v1', function() {
					var request = gapi.client.urlshortener.url.insert({
						resource : {
							longUrl : inputUrl
						}
					});
					request.execute(function(response) {
						urlDetails.shortUrl = response.id;
						
						$rootScope.$apply();
					});
				});
			}
			
			function listAllUrls() {
				gapi.client.load('urlshortener', 'v1', function() {
					var request = gapi.client.urlshortener.url.list({
						"projection": "ANALYTICS_CLICKS"
					});
					request.execute(function(response) {
						// empty original array
						urlHistory.length = 0;
						
						if (response.items && response.items.length) {
							var tempItems = response.items;
							var arrayLength = tempItems.length;
							
							for (var i = 0; i < arrayLength; i++) {
								var curHistory = new Object();
								curHistory.originalUrl = tempItems[i].longUrl;
								curHistory.created = tempItems[i].created;
								curHistory.shortUrl = tempItems[i].id;
								curHistory.allClicks = tempItems[i].analytics.allTime.shortUrlClicks;
								
								urlHistory.push(curHistory);
							}
							
							$rootScope.$apply();
						}
						
					});
				});
			}

		}];
		
		function storeAuth(auth) {
			myAuth = auth;
		}

	}
})();