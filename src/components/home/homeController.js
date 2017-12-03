(function() {
    'use strict';

    var controller = function(
        localStorageData,
        httpServices,
        $state,
        productsData
    ) {

        this.localStorageData = localStorageData;
        this.httpServices = httpServices;
        this.$state = $state;
        this.productsData = productsData.data;
    };

    controller.prototype.init = function() {
        var self = this;
        self.allProducts = self.productsData;
        self.productValue = '';
        self.productTVAvalue = '';
        self.searchFlag = false;
        self.prod = {};
    };

    controller.prototype.addProduct = function(){
        var self = this;
        var product = {};
        product.name = self.prod.Name;
        product.quantity = self.prod.Quantity;
        product.price = self.prod.PriceNoTVA;
        product.unitMeasure = self.prod.UM;
        product.productValue = self.prod.Value;
        product.tvaValue = self.prod.TVAvalue;
        product.acquireDate = self.prod.AcquireDate;

        self.httpServices.addProduct(product).then(function(res){
            self.prod = {};
            self.httpServices.getProducts().then(function(res){
                self.allProducts = res.data;
            });
        });
    };

    controller.prototype.calculateValues = function() {
        var self = this;

        if(self.prod.Quantity && self.prod.PriceNoTVA) {
            self.prod.Value = parseFloat(self.prod.Quantity * self.prod.PriceNoTVA).toFixed(2);
            self.prod.TVAvalue = parseFloat((self.prod.Quantity * self.prod.PriceNoTVA) * 0.09).toFixed(2);
        } else {
            self.prod.Value = '';
            self.prod.TVAvalue = '';
        }
    };

    controller.prototype.searchProductName = function(name) {
        var self = this;

        angular.forEach(self.allProducts, function(product){
            if(product.name.substring(0, 7) === name.substring(0, 7)){
                self.prod.Name = product.name;
                self.searchFlag = true;
            }
        });

    };

    controller.prototype.deleteProduct = function(product) {
        var self = this;
        self.httpServices.eraseProduct(product).then(function(res){
            self.httpServices.getProducts().then(function(res){
                self.allProducts = res.data;
            });
        });
    };

    controller.$inject = [
        'localStorageData',
        'httpServices',
        '$state',
        'productsData'
    ];

    app.controller('homeController', controller);


})();
