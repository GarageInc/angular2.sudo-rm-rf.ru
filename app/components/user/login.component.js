System.register(['angular2/core', 'angular2/router', './../../services/user.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, user_service_1;
    var LoginComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            }],
        execute: function() {
            LoginComponent = (function () {
                function LoginComponent(userService, router) {
                    this.userService = userService;
                    this.router = router;
                    this.submitted = false;
                }
                LoginComponent.prototype.onLogin = function () {
                    var _this = this;
                    this.submitted = true;
                    this.userService.login(this.username, this.password, this.rememberme).subscribe(function (result) {
                        _this.submitted = false;
                        if (result) {
                            _this.router.navigate(['Dashboard']);
                        }
                        else {
                            alert("Fail to registration: ckeck your name!");
                        }
                    });
                };
                LoginComponent = __decorate([
                    core_1.Component({
                        selector: 'login',
                        templateUrl: 'app/views/user/login.component.html'
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
                ], LoginComponent);
                return LoginComponent;
            })();
            exports_1("LoginComponent", LoginComponent);
        }
    }
});
//# sourceMappingURL=login.component.js.map