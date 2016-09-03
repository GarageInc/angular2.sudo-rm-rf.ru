System.register(['angular2/core', '../models/graphs/graph', 'angular2/http', 'rxjs/Rx', "./base/base.service"], function(exports_1, context_1) {
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
    var core_1, graph_1, http_1, base_service_1;
    var GraphService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (graph_1_1) {
                graph_1 = graph_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (base_service_1_1) {
                base_service_1 = base_service_1_1;
            }],
        execute: function() {
            GraphService = (function (_super) {
                __extends(GraphService, _super);
                function GraphService(http) {
                    _super.call(this, http);
                    this.http = http;
                    this.GATEWAY = base_service_1.BaseService.GATEWAY_GRAPHS;
                }
                GraphService.prototype.getGraphs = function () {
                    return this.get(this.GATEWAY + "/index", {}, false)
                        .map(this.extractDataGraphs)
                        .catch(this.handleError)
                        .toPromise();
                };
                GraphService.prototype.getMyGraphs = function () {
                    return this.get(this.GATEWAY + "/usergraphs", {}, true)
                        .map(this.extractDataGraphs)
                        .catch(this.handleError)
                        .toPromise();
                };
                GraphService.prototype.create = function (name) {
                    return this.post(this.GATEWAY + "/create", {
                        "graphname": name
                    }, true)
                        .map(function (result) { return result ? true : false; })
                        .toPromise();
                };
                GraphService.prototype.save = function (graph) {
                    return this.post(this.GATEWAY + "/save", {
                        "graph_id": graph.id,
                        "graphname": graph.graphname
                    }, true)
                        .map(function (result) { return result ? true : false; })
                        .toPromise();
                };
                GraphService.prototype.structure = function (id) {
                    return this.get(this.GATEWAY + "/structure", {
                        "graph_id": id
                    }, false)
                        .map(this.extractGraphStructure)
                        .toPromise();
                };
                GraphService.prototype.findpath = function (graph, node_first_id, node_second_id) {
                    return this.post(this.GATEWAY + "/findpath", {
                        "graph_id": graph.id,
                        "node_first_id": node_first_id,
                        "node_second_id": node_second_id
                    }, false)
                        .map(function (res) {
                        return res.json();
                    })
                        .toPromise();
                };
                // UTILS
                GraphService.prototype.extractDataGraphs = function (res) {
                    var body = res.json();
                    var graphs = [];
                    for (var _i = 0, body_1 = body; _i < body_1.length; _i++) {
                        var entry = body_1[_i];
                        var graph = new graph_1.Graph();
                        graph.fillFromJSON(entry);
                        graphs.push(graph);
                    }
                    return graphs;
                };
                GraphService.prototype.extractGraphStructure = function (res) {
                    var body = res.json();
                    var graph = new graph_1.Graph();
                    graph.fillStructure(body);
                    return graph;
                };
                GraphService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], GraphService);
                return GraphService;
            }(base_service_1.BaseService));
            exports_1("GraphService", GraphService);
        }
    }
});
//# sourceMappingURL=graph.service.js.map