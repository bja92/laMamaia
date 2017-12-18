(function() {
    'use strict';
    var app = angular.module('app');
    app.service("sessionStorage", ["$window", function($window){
        const getData = (key) => {
           let data = $window.sessionStorage.getItem(key);
           return JSON.parse(data);
        }
        const storeData = (key, data) => {
            let json = JSON.stringify(data);
            $window.sessionStorage.setItem(key, json);
        }
        const removeData = (key, data_position) => {
            let data = getData(key);
            data.splice(data_position, 1);
            storeData(key, data);
        }
        const initStorage = (key, value) => {
            if (!getData(key)) {
                storeData(key, value);
            }
        }
        const removeLS = (key) => {
                $window.sessionStorage.removeItem(key);
        }
        return {
            get: getData,
            store: storeData,
            initialize: initStorage,
            remove: removeData,
            removeLS: removeLS
        };
    }]);

}());
