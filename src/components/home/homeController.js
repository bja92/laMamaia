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
        self.editSelected = false;

        $(document).ready(function() {
            $('#tableProduct').DataTable({
                bSort : false,
                searching: false
            });
        });
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
        product.expireDate = self.prod.expireDate;
        product.status = 'ready';

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


    controller.prototype.verifyExpireDate = function(product) {
        var self = this;
        var expireDate = new Date(product.expireDate);
        var expireDateFromToday = new Date().addDays(8);
        var today = new Date();
        if(today > expireDate < expireDateFromToday) {
            return 'expiring';
        }
    };

    controller.prototype.editProduct = function(produs) {
        var self = this;
        self.prod.Name = produs.name;
        self.prod.Quantity = produs.quantity;
        self.prod.PriceNoTVA = produs.price;
        self.prod.UM = produs.unitMeasure;
        self.prod.Value = produs.productValue;
        self.prod.TVAvalue = produs.tvaValue;
        self.prod.AcquireDate = new Date(produs.acquireDate);
        self.prod.expireDate = new Date(produs.expireDate);
        self.prod.status = produs.status;

        self.editedProduct = produs;
        self.editSelected = true;
    };

    controller.prototype.editProductSelected = function(produs) {
        var self = this;
        var obj = {};
        obj.name = self.prod.Name;
        obj.quantity = self.prod.Quantity;
        obj.price = self.prod.PriceNoTVA;
        obj.unitMeasure = self.prod.UM;
        obj.productValue = self.prod.Value;
        obj.tvaValue = self.prod.TVAvalue;
        obj.acquireDate = self.prod.AcquireDate;
        obj.expireDate = self.prod.expireDate;
        obj.status = self.prod.status;
        obj._id = self.editedProduct._id;

        self.httpServices.updateProduct(obj).then(function(res){
            self.httpServices.getProducts().then(function(res){
                self.allProducts = res.data;
                self.editSelected = false;
                self.editedProduct = {};
                self.prod = {};
            });
        });
    };

    Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
    };

    controller.$inject = [
        'localStorageData',
        'httpServices',
        '$state',
        'productsData'
    ];

    app.controller('homeController', controller);


})();
