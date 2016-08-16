System.register(['angular2/core', 'angular2/router', './../../models/graph', './../../services/graph.service'], function(exports_1) {
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
    var GraphDetailComponent;
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
            GraphDetailComponent = (function () {
                function GraphDetailComponent(_graphService, _routeParams) {
                    this._graphService = _graphService;
                    this._routeParams = _routeParams;
                }
                GraphDetailComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = +this._routeParams.get('id');
                    this._graphService.getGraph(id)
                        .then(function (graph) { return _this.graph = graph; });
                };
                GraphDetailComponent.prototype.goBack = function () {
                    window.history.back();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', graph_1.Graph)
                ], GraphDetailComponent.prototype, "graph");
                GraphDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'my-graph-detail',
                        templateUrl: 'app/components/graphs/views/graphs/graph-detail.component.html',
                        styleUrls: ['app/assets/css/graph-detail.component.css']
                    }), 
                    __metadata('design:paramtypes', [graph_service_1.GraphService, router_1.RouteParams])
                ], GraphDetailComponent);
                return GraphDetailComponent;
            })();
            exports_1("GraphDetailComponent", GraphDetailComponent);
        }
    }
});
//# sourceMappingURL=graph-detail.component.js.map