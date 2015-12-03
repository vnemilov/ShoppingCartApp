var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html'
        })

        // nested list with custom controller
        .state('home.cats', {
            url: '/cats',
            templateUrl: 'partials-home-cats.html',
            controller: 'CatsListCtrl'
        })

        // nested list with just some random string data
        .state('home.dogs', {
            url: '/dogs',
            templateUrl: 'partials-home-dogs.html',
            controller: 'DogsListCtrl'
        })
});

routerApp.controller('DogsListCtrl', function ($scope, $http) {
  $http.get('dogs.json').success(function(data) {
    $scope.dogs = data;
  });
});

routerApp.controller('CatsListCtrl', function ($scope, $http) {
  $http.get('cats.json').success(function(data) {
    $scope.cats = data;
  });
});
