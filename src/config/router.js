(function(){
    "use strict";
    var app = angular.module('app');
        app.config([
            '$stateProvider',
            '$urlRouterProvider',
            '$locationProvider',
            function($stateProvider, $urlRouterProvider, $locationProvider){
                $urlRouterProvider.otherwise('/login');
                $locationProvider.hashPrefix('');
                $locationProvider.html5Mode(true);
            $stateProvider
                .state('login', {
                    url : '/login',
                    templateUrl : '/components/login/login.html',
                    controller : 'loginController as loginCtrl',
                })
                .state('home', {
                    url : '/home',
                    templateUrl : '/components/home/home.html',
                    controller : 'homeController as homeCtrl',
                    resolve: {
                        productsData: function (httpServices) {
                            return httpServices.getProducts();
                        }
                    }
                });

        }]);
}());
