var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'partial-home.html',
            controller: 'AllAnimalsCtrl'
        })

        // nested list with custom controller
        .state('home.animal', {
            url: '/animal/:name',
            templateUrl: 'partials-home-cats.html',
            controller: 'AnimalCtrl'
        })

        // nested list with just some random string data
        .state('home.dogs', {
            url: '/dogs',
            templateUrl: 'partials-home-dogs.html',
            controller: 'DogsListCtrl'
        })
});

routerApp.controller('AllAnimalsCtrl', function ($scope, $http) {
  $http.get('animals/animals.json').success(function(data) {
    $scope.animals = data;
  });
});



routerApp.controller('AnimalCtrl', function ($scope, $stateParams, $http) {
    var name = $stateParams.name;
    $http.get('/animals/' + name+'.json').success(function (data) {
        $scope.animal = data;
    });
});
