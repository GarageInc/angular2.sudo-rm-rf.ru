System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', "./base/base.service", "../models/graphs/edge"], function(exports_1, context_1) {
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
    var core_1, http_1, base_service_1, edge_1;
    var EdgeService;
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
            function (edge_1_1) {
                edge_1 = edge_1_1;
            }],
        execute: function() {
            EdgeService = (function (_super) {
                __extends(EdgeService, _super);
                function EdgeService(http) {
                    _super.call(this, http);
                    this.http = http;
                }
                EdgeService.prototype.create = function (graph, weight, node_first_id, node_second_id) {
                    var params = {};
                    params["graph_id"] = graph.id;
                    params["weight"] = weight.toString();
                    params["node_first_id"] = node_first_id;
                    params["node_second_id"] = node_second_id;
                    return this.post(base_service_1.BaseService.GATEWAY_EDGES + "/create", this.setAuthParams(params))
                        .map(this.extractEdgeStructure)
                        .toPromise();
                };
                EdgeService.prototype.delete = function (id) {
                    var params = {};
                    params["edge_id"] = id;
                    return this.post(base_service_1.BaseService.GATEWAY_EDGES + "/delete", this.setAuthParams(params))
                        .map(function (result) { return result ? true : false; })
                        .toPromise();
                };
                EdgeService.prototype.extractEdgeStructure = function (res) {
                    var body = res.json();
                    var edge = new edge_1.Edge();
                    edge.fillFromJSON(body);
                    return edge;
                };
                EdgeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], EdgeService);
                return EdgeService;
            }(base_service_1.BaseService));
            exports_1("EdgeService", EdgeService);
        }
    }
});
//# sourceMappingURL=edge.service.js.map