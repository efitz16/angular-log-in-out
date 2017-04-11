'use strict';

// Declare app level module which depends on views, and components
var myApp = angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'firebase'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
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
  .when('/view1/success', {
  	controller: 'SuccessController',
  	templateUrl: 'success.html'
  })
  .otherwise({redirectTo: '/view1/login'});
}]);
