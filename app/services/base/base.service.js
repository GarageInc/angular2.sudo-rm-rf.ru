System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', 'rxjs/Rx', "../../models/states/user.state"], function(exports_1) {
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
    var core_1, http_1, Observable_1, user_state_1;
    var BaseService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (user_state_1_1) {
                user_state_1 = user_state_1_1;
            }],
        execute: function() {
            BaseService = (function () {
                // protected static GATEWAY_USER_LOGIN:string = "http://php.sudo-rm-rf.ru/web/index.php/site/login";
                function BaseService(http) {
                    this.http = http;
                }
                BaseService.prototype.setAuthParams = function (params) {
                    params["uid"] = user_state_1.UserState.activeUser.id;
                    params["pub_token"] = user_state_1.UserState.activeUser.pub_token;
                    return params;
                };
                BaseService.prototype.getHeaders = function () {
                    var headers = new http_1.Headers();
                    headers.set('Content-Type', 'application/x-www-form-urlencoded');
                    headers.set('Accept', 'text/xml');
                    return headers;
                };
                BaseService.prototype.post = function (url, params, tokenized) {
                    if (tokenized === void 0) { tokenized = true; }
                    if (tokenized == true) {
                        params = this.setAuthParams(params);
                    }
                    var bodyArray = [];
                    for (var key in params) {
                        var value = params[key];
                        bodyArray.push(key + '=' + encodeURIComponent(value));
                    }
                    var body = bodyArray.join("&");
                    var headers = this.getHeaders();
                    return this.http
                        .post(url, body, {
                        headers: headers
                    });
                };
                BaseService.prototype.get = function (url, params, tokenized) {
                    if (tokenized === void 0) { tokenized = true; }
                    if (tokenized == true) {
                        params = this.setAuthParams(params);
                    }
                    //
                    var get_params = new http_1.URLSearchParams();
                    for (var key in params) {
                        var value = params[key];
                        get_params.set(key, encodeURIComponent(value));
                    }
                    // let bodyArray:Array<string> = [];
                    //
                    // for (var key in params) {
                    //     var value = params[key];
                    //
                    //     bodyArray.push(key + '=' + encodeURIComponent(value))
                    // }
                    //
                    // let body:string = bodyArray.join("&");
                    return this.http
                        .get(url, {
                        search: get_params
                    });
                };
                BaseService.prototype.extractData = function (res) {
                };
                BaseService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg); // log to console instead
                    // this.router.navigate(['Dashboard']);
                    return Observable_1.Observable.throw(errMsg);
                };
                BaseService.GATEWAY_GRAPHS = "http://php.sudo-rm-rf.ru/web/index.php/graph";
                BaseService.GATEWAY_NODES = "http://php.sudo-rm-rf.ru/web/index.php/node";
                BaseService.GATEWAY_EDGES = "http://php.sudo-rm-rf.ru/web/index.php/edge";
                BaseService.GATEWAY_USER_LOGIN = "http://php.sudo-rm-rf.ru/web/index.php/site/login";
                BaseService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], BaseService);
                return BaseService;
            })();
            exports_1("BaseService", BaseService);
        }
    }
});
//# sourceMappingURL=base.service.js.map