System.register(['angular2/core', '../models/graphs/node', 'angular2/http', 'rxjs/Rx', "./base/base.service"], function(exports_1, context_1) {
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
    var core_1, node_1, http_1, base_service_1;
    var NodeService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (base_service_1_1) {
                base_service_1 = base_service_1_1;
            }],
        execute: function() {
            NodeService = (function (_super) {
                __extends(NodeService, _super);
                function NodeService(http) {
                    _super.call(this, http);
                    this.http = http;
                }
                NodeService.prototype.create = function (graph, name) {
                    var params = {};
                    params["nodename"] = name;
                    params["graph_id"] = graph.id;
                    return this.post(base_service_1.BaseService.GATEWAY_NODES + "/create", this.setAuthParams(params))
                        .map(this.extractNodeStructure)
                        .toPromise();
                };
                NodeService.prototype.extractNodeStructure = function (res) {
                    var body = res.json();
                    var node = new node_1.Node();
                    node.fillFromJSON(body);
                    return node;
                };
                NodeService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], NodeService);
                return NodeService;
            }(base_service_1.BaseService));
            exports_1("NodeService", NodeService);
        }
    }
});
//# sourceMappingURL=node.service.js.map