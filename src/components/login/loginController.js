(function() {
    'use strict';

    var controller = function(
        $state,
        sessionStorage,
        httpServices
    ) {
        this.$state = $state;
        this.sessionStorage = sessionStorage;
        this.httpServices = httpServices;

    };

    controller.prototype.init = function() {
        var self = this;
        self.errMsg = false;
        self.login = function(user, pw) {
            if((user === 'gabi') && (pw === 'gabi13')) {
                self.sessionStorage.store('login', user);
                self.$state.go('home');
            } else {
                self.errMsg = true;
            }
        };
    };

    controller.$inject = [
        '$state',
        'sessionStorage',
        'httpServices'
    ];

    app.controller('loginController', controller);

}());
