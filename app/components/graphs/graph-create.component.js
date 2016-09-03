System.register(['angular2/core', 'angular2/router', '../../models/graphs/graph', './../../services/graph.service'], function(exports_1) {
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
    var core_1, router_1, graph_1, graph_service_1;
    var GraphCreateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (graph_1_1) {
                graph_1 = graph_1_1;
            },
            function (graph_service_1_1) {
                graph_service_1 = graph_service_1_1;
            }],
        execute: function() {
            GraphCreateComponent = (function () {
                function GraphCreateComponent(_graphService, _routeParams, _router) {
                    this._graphService = _graphService;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.graph = new graph_1.Graph();
                    this.submitted = false;
                }
                GraphCreateComponent.prototype.onCreate = function () {
                    var _this = this;
                    this.submitted = true;
                    this._graphService.create(this.graph.graphname).then(function (result) {
                        _this.submitted = false;
                        if (result) {
                            _this._router.navigate(['Dashboard']);
                        }
                        else {
                            alert("Can't create graph!");
                        }
                    });
                };
                GraphCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'my-graph-create',
                        templateUrl: 'app/views/graphs/graph-create.component.html',
                        styleUrls: ['app/assets/css/graph-create.component.css']
                    }), 
                    __metadata('design:paramtypes', [graph_service_1.GraphService, router_1.RouteParams, router_1.Router])
                ], GraphCreateComponent);
                return GraphCreateComponent;
            })();
            exports_1("GraphCreateComponent", GraphCreateComponent);
        }
    }
});
//# sourceMappingURL=graph-create.component.js.map