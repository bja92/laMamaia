(function() {
    'use strict';
    var app = angular.module('app');
    app.service("httpServices", ["$http", function($http){
        return {
            addProduct: addProduct,
            getProducts: getProducts,
            eraseProduct: eraseProduct,
            updateProduct: updateProduct
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

        function updateProduct(product) {
            return $http.put('/products/' + product._id, product);
        }

    }]);
}());
