System.register(['angular2/core', 'angular2/router', './services/user.service'], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
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
    var __param = (this && this.__param) || function (paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    };
    var core_1, router_1, user_service_1;
    var LoggedInRouterOutlet;
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
            LoggedInRouterOutlet = (function (_super) {
                __extends(LoggedInRouterOutlet, _super);
                function LoggedInRouterOutlet(_elementRef, _loader, _parentRouter, nameAttr, userService) {
                    _super.call(this, _elementRef, _loader, _parentRouter, nameAttr);
                    this.userService = userService;
                    this.parentRouter = _parentRouter;
                    this.publicRoutes = ['', 'login', 'signup'];
                }
                LoggedInRouterOutlet.prototype.activate = function (instruction) {
                    if (this._canActivate(instruction.urlPath)) {
                        return _super.prototype.activate.call(this, instruction);
                    }
                    this.parentRouter.navigate(['Login']);
                };
                LoggedInRouterOutlet.prototype._canActivate = function (url) {
                    return this.publicRoutes.indexOf(url) !== -1 || this.userService.isAuthenticated();
                };
                LoggedInRouterOutlet = __decorate([
                    core_1.Directive({
                        selector: 'router-outlet'
                    }),
                    __param(3, core_1.Attribute('name')), 
                    __metadata('design:paramtypes', [core_1.ElementRef, core_1.DynamicComponentLoader, router_1.Router, String, user_service_1.UserService])
                ], LoggedInRouterOutlet);
                return LoggedInRouterOutlet;
            })(router_1.RouterOutlet);
            exports_1("LoggedInRouterOutlet", LoggedInRouterOutlet);
        }
    }
});
//# sourceMappingURL=logged-in-router-outlet.js.map