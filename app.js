var routerApp = angular.module('routerApp', ['ui.router']);

routerApp.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider

    // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'views/home.html'
        })

        .state('shop', {
            url: '/shop',
            templateUrl: 'views/shop.html',
            controller: 'AllLaptopsCtrl'
        })

        // nested list with custom controller
        .state('laptop', {
            url: '/laptop/:name',
            templateUrl: 'views/laptops.html',
            controller: 'LaptopCtrl'
        })

        .state('cart', {
            url: '/cart',
            templateUrl: 'views/cart.html',
            controller: 'CartCtrl'
        })
});


routerApp.controller('CartCtrl', function ($scope, CommonProp) {
    $scope.total = CommonProp.getTotal();
    $scope.items = CommonProp.getItems();
    $scope.removeItem = function (laptop) {
        CommonProp.removeItem(laptop);
        $scope.total = CommonProp.getTotal();
    };
});

routerApp.controller('AllLaptopsCtrl', function ($scope, $http, CommonProp) {


    $scope.total = CommonProp.getTotal();
    $http.get('laptops/laptops.json').success(function (data) {
        $scope.laptops = data;
    });
    $scope.messagee = function (laptop) {
        CommonProp.addItem(laptop);
        CommonProp.setTotal(laptop);
        $scope.total = CommonProp.getTotal();
    }
});


routerApp.controller('LaptopCtrl', function ($scope, $stateParams, $http) {
        var name = $stateParams.name;
        $http.get('/laptops/' + name + '.json').success(function (data) {
            $scope.laptop = data;
        });
    })
    .service('CommonProp', function () {
        var Items = [];
        var Total = 0;

        return {
            getItems: function () {
                return Items;
            },
            addItem: function (item) {
                if (Items.length != 0) {
                    var flag = false;
                    for (var i = 0; i < Items.length; i++) {
                        if (Items[i].id == item.id) {
                            Items[i].count += 1;
                            flag = true;
                            break;
                        }
                    }
                    if (!flag) {
                        Items.push({'id': item.id, 'count': 1, 'price': item.price, 'model': item.model});
                    }
                }
                else {
                    Items.push({'id': item.id, 'count': 1, 'price': item.price, 'model': item.model});
                }
            },
            getTotal: function () {
                return Total;
            },
            setTotal: function () {
                Total = 0;
                for (var i = 0; i < Items.length; i += 1) {
                    Total += Items[i].price * Items[i].count;
                }
            },
            removeItem: function (item) {
                for (var i = 0; i < Items.length; i += 1) {
                    if (Items[i].id == item) {
                        Items.splice(i, 1);
                    }
                }
                Total = 0;
                for (var i = 0; i < Items.length; i += 1) {
                    Total += Items[i].price * Items[i].count;
                }

            }
        };
    });