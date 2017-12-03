(function() {
    'use strict';
    var app = angular.module('app');
    app.service("httpServices", ["$http", function($http){
        return {
            addProduct: addProduct,
            getProducts: getProducts,
            eraseProduct: eraseProduct
        };

        function addProduct(product){
            return $http.post('/products', product);
        }

        function getProducts(){
            return $http.get('/products');
        }

        function eraseProduct(product) {
            return $http.delete('/products/' + product._id);
        }

    }]);
}());
