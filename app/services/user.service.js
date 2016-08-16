System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', "./base/base.service", "../models/user"], function(exports_1) {
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
                UserService.prototype.login = function (username, password, rememberMe) {
                    var _this = this;
                    var headers = new http_1.Headers();
                    rememberMe = !!rememberMe;
                    headers.set('Content-Type', 'application/x-www-form-urlencoded');
                    headers.set('Accept', 'text/xml');
                    var body = 'username=' + encodeURIComponent(username) +
                        '&password=' + encodeURIComponent(password) + '&rememberMe=' + encodeURIComponent(rememberMe ? "true" : "false");
                    this.makeCorsRequest(body);
                    return this.http
                        .post(base_service_1.BaseService.GATEWAY_USER_LOGIN, body, {
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
                UserService.prototype.getTitle = function (text) {
                    return text.match('<title>(.*)?</title>')[1];
                };
                UserService.prototype.makeCorsRequest = function (body) {
                    // bibliographica.org supports CORS.
                    var url = base_service_1.BaseService.GATEWAY_USER_LOGIN;
                    var xhr = new XMLHttpRequest();
                    //
                    //xhr.withCredentials = true;
                    if ("withCredentials" in xhr) {
                        // XHR for Chrome/Safari/Firefox.
                        xhr.open("POST", url, true);
                    }
                    else {
                        // CORS not supported.
                        xhr = null;
                    }
                    if (!xhr) {
                        alert('CORS not supported');
                        return;
                    }
                    // Response handlers.
                    xhr.onload = function () {
                        var text = xhr.responseText;
                        var title = this.getTitle(text);
                        alert('Response from CORS request to ' + url + ': ' + title);
                    };
                    xhr.onerror = function () {
                        alert('Woops, there was an error making the request.');
                    };
                    xhr.send(body);
                };
                UserService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], UserService);
                return UserService;
            })(base_service_1.BaseService);
            exports_1("UserService", UserService);
        }
    }
});
//# sourceMappingURL=user.service.js.map