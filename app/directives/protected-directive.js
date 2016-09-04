System.register(['angular2/core', '../services/user.service', "angular2/router"], function(exports_1) {
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
    var core_1, user_service_1, router_1;
    var ProtectedDirective;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            // TODO выпилено за ненадобностью
            ProtectedDirective = (function () {
                function ProtectedDirective(userService, router, location) {
                    this.userService = userService;
                    this.router = router;
                    this.location = location;
                    this.sub = null;
                    if (!userService.isAuthenticated()) {
                        this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                        this.router.navigate(['PublicPage']);
                    }
                    //
                    // this.sub = this.userService.subscribe((val) => {
                    //     if ( !val.authenticated) {
                    //         this.location.replaceState('/'); // clears browser history so they can't navigate with back button
                    //         this.router.navigate(['LoggedoutPage']); // tells them they've been logged out (somehow)
                    //     }
                    // });
                }
                ProtectedDirective.prototype.ngOnDestroy = function () {
                    if (this.sub != null) {
                        this.sub.unsubscribe();
                    }
                };
                ProtectedDirective = __decorate([
                    core_1.Directive({
                        selector: '[protected]'
                    }), 
                    __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, router_1.Location])
                ], ProtectedDirective);
                return ProtectedDirective;
            })();
            exports_1("ProtectedDirective", ProtectedDirective);
        }
    }
});
//# sourceMappingURL=protected-directive.js.map