System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', "./base/base.service", "../models/user"], function(exports_1, context_1) {
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
    var core_1, http_1, base_service_1, user_1;
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
            }],
        execute: function() {
            UserService = (function (_super) {
                __extends(UserService, _super);
                function UserService(http) {
                    _super.call(this, http);
                    this.http = http;
                    this.is_logged_in = false;
                    this.is_logged_in = !!localStorage.getItem('token');
                }
                UserService.prototype.login = function (username, password, rememberme) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    headers.append('Access-Control-Allow-Origin', '*');
                    console.log(headers);
                    return this.http
                        .post(base_service_1.BaseService.GATEWAY_USER_LOGIN, JSON.stringify({ username: username, password: password, rememberme: rememberme }), {
                        headers: headers
                    })
                        .map(function (res) { return res.json(); })
                        .map(function (res) {
                        if (res.success) {
                            localStorage.setItem('token', res.token);
                            _this.is_logged_in = true;
                        }
                        return res.success;
                    });
                };
                UserService.prototype.logout = function () {
                    localStorage.removeItem('token');
                    this.is_logged_in = false;
                };
                UserService.prototype.isAuthenticated = function () {
                    return this.is_logged_in;
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