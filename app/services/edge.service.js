System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', "./base/base.service", "../models/graphs/edge"], function(exports_1) {
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
                    this.GATEWAY = base_service_1.BaseService.GATEWAY_EDGES;
                }
                EdgeService.prototype.create = function (graph, weight, node_first_id, node_second_id) {
                    return this.post(this.GATEWAY + "/create", {
                        "graph_id": graph.id,
                        "weight": weight.toString(),
                        "node_first_id": node_first_id,
                        "node_second_id": node_second_id
                    }, true)
                        .map(this.extractEdgeStructure)
                        .toPromise();
                };
                EdgeService.prototype.delete = function (graph, id) {
                    return this.post(this.GATEWAY + "/delete", {
                        "edge_id": id,
                        "graph_id": graph.id
                    }, true)
                        .map(function (result) { return result ? true : false; })
                        .toPromise();
                };
                // UTILS
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
            })(base_service_1.BaseService);
            exports_1("EdgeService", EdgeService);
        }
    }
});
//# sourceMappingURL=edge.service.js.map