(function () {
    'use strict';

    var app = angular.module('demoApp');
    
    app.directive('demoShortener', demoShortener);
    
    function demoShortener($templateRequest, $compile) {
        
        var directive = {
        	restrict: 'E',
        	replace: true,
            scope: {
            },
            link: function($scope, $element) {
            	// load template file through $templateRequest
                $templateRequest('app/shortener/templates/shortener.template.html').then(function(html){
                    var template = angular.element(html);
                    $element.append(template);
                    $compile(template)($scope);
                });
            }
        };
        return directive;
        
    }
    
})();