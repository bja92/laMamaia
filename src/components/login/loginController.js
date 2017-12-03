(function() {
    'use strict';

    var controller = function(
        $state,
        localStorageData,
        httpServices
    ) {
        this.$state = $state;
        this.localStorageData = localStorageData;
        this.httpServices = httpServices;

    };

    controller.prototype.init = function() {
        var self = this;
        self.errMsg = false;

        self.login = function(user, pw) {
            console.log(user,pw);
            if((user === 'gabi') && (pw === 'gabi13')) {
                self.$state.go('home');
            } else {
                self.errMsg = true;
            }
        };
    };

    controller.$inject = [
        '$state',
        'localStorageData',
        'httpServices'
    ];

    app.controller('loginController', controller);

}());
