
var app = angular.module('MyApp', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('firstpage', {
      url: '/firstpage',
      templateUrl: 'htmls/firstpage.html',
      controller: 'firstpageController',
      /*
      onEnter: ['$state', 'authF', function($state, authF){
        if(authF.isLoggedIn()){
          $state.go('userpage');
        }
      }]
      */
    });

  $urlRouterProvider.otherwise('firstpage');
    
}]);

