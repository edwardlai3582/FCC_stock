
var app = angular.module('MyApp', ['ui.router','highcharts-ng']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('firstpage', {
      url: '/firstpage',
      templateUrl: 'htmls/firstpage.html',
      controller: 'firstpageController',
      resolve: {
        getStocks: ['stockF', function(stockF) {
            return stockF.getStocks();
        }]
      }
    });

  $urlRouterProvider.otherwise('firstpage');
    
}]);

