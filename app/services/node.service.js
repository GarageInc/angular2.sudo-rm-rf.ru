System.register(['angular2/core', '../models/graphs/node', 'angular2/http', 'rxjs/Rx', "./base/base.service"], function(exports_1) {
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
                    this.GATEWAY = base_service_1.BaseService.GATEWAY_NODES;
                }
                NodeService.prototype.create = function (graph, name) {
                    return this.post(this.GATEWAY + "/create", {
                        "nodename": name,
                        "graph_id": graph.id
                    }, true)
                        .map(this.extractNodeStructure)
                        .toPromise();
                };
                NodeService.prototype.delete = function (graph, id) {
                    return this.post(this.GATEWAY + "/delete", {
                        "node_id": id,
                        "graph_id": graph.id
                    }, true)
                        .map(function (result) { return result ? true : false; })
                        .toPromise();
                };
                // UTILS
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
            })(base_service_1.BaseService);
            exports_1("NodeService", NodeService);
        }
    }
});
//# sourceMappingURL=node.service.js.map