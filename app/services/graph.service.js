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
                }
                GraphService.prototype.getGraphs = function () {
                    var params = {};
                    return this.get(base_service_1.BaseService.GATEWAY_GRAPHS + "/index", this.setAuthParams(params))
                        .map(this.extractDataGraphs)
                        .catch(this.handleError)
                        .toPromise();
                };
                GraphService.prototype.create = function (name) {
                    var params = {};
                    params["graphname"] = name;
                    return this.post(base_service_1.BaseService.GATEWAY_GRAPHS + "/create", this.setAuthParams(params))
                        .map(function (result) { return result ? true : false; });
                };
                GraphService.prototype.save = function (graph) {
                    var params = {};
                    params["graph_id"] = graph.id.toString();
                    params["graphname"] = graph.graphname;
                    return this.post(base_service_1.BaseService.GATEWAY_GRAPHS + "/save", this.setAuthParams(params))
                        .toPromise();
                };
                GraphService.prototype.getGraphSctructure = function (id) {
                    var params = {};
                    params["graph_id"] = id.toString();
                    return this.get(base_service_1.BaseService.GATEWAY_GRAPHS + "/structure", this.setAuthParams(params))
                        .map(this.extractGraphStructure)
                        .toPromise();
                };
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
                    graph.graphname = body.graphname;
                    graph.id = body.id;
                    graph.fillNodes(body.nodes);
                    graph.fillEdges(body.edges);
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