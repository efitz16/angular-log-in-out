'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'firebase'
]).config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider
  .when('/view1/login', {
  	controller: 'RegistrationController',
  	templateUrl: 'login.html'
  })
  .when('/view1/register', {
  	controller: 'RegistrationController',
  	templateUrl: 'signup.html'
  })
  .when('/view1/meetings', {
  	controller: 'MeetingsController',
  	templateUrl: 'meetings.html',
    resolve: {
      currentAuth: function(Authentication) {
        return Authentication.myObject.requireAuth();
      }
    }
  })
  .otherwise({redirectTo: '/view1/login'});
}]);

myApp.run(['$rootScope', '$location', function($rootScope, $location){
  $rootScope.$on('$routeChangeError', function(event, next, previous, error){
    if (error == 'AUTH_REQUIRED') {
      $rootScope.message = 'Must be logged in';
      $location.path('/login');
    }
  });
}]);
