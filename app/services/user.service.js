System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', "./base/base.service", "../models/user", "../models/states/user.state"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, base_service_1, user_1, user_state_1;
    var UserService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (base_service_1_1) {
                base_service_1 = base_service_1_1;
            },
            function (user_1_1) {
                user_1 = user_1_1;
            },
            function (user_state_1_1) {
                user_state_1 = user_state_1_1;
            }],
        execute: function() {
            UserService = (function (_super) {
                __extends(UserService, _super);
                function UserService(http) {
                    _super.call(this, http);
                    this.http = http;
                    this.GATEWAY = base_service_1.BaseService.GATEWAY_USER_LOGIN;
                }
                UserService.prototype.login = function (username, password, rememberMe) {
                    rememberMe = !!rememberMe;
                    return this.post(this.GATEWAY, {
                        "password": password,
                        "username": username,
                        "rememberMe": rememberMe.toString()
                    }, false)
                        .map(function (res) { return res.json(); })
                        .map(function (res) {
                        if (res.id && res.pub_token) {
                            user_state_1.UserState.activeUser.id = res.id;
                            user_state_1.UserState.activeUser.pub_token = res.pub_token;
                            return true;
                        }
                        else {
                            return false;
                        }
                    });
                };
                UserService.prototype.logout = function () {
                    user_state_1.UserState.reset();
                };
                UserService.prototype.isAuthenticated = function () {
                    return !!user_state_1.UserState.activeUser.pub_token;
                };
                UserService.prototype.extractData = function (res) {
                    var body = res.json();
                    var user = new user_1.User();
                    user.fillFromJSON(body);
                    return user;
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserService);
                return UserService;
            }(base_service_1.BaseService));
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map