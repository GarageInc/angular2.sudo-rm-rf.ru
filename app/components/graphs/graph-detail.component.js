System.register(['angular2/core', 'angular2/router', '../../models/graphs/graph', './../../services/graph.service', "../bar-graph.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, graph_1, graph_service_1, bar_graph_component_1;
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
            },
            function (bar_graph_component_1_1) {
                bar_graph_component_1 = bar_graph_component_1_1;
            }],
        execute: function() {
            GraphDetailComponent = (function () {
                function GraphDetailComponent(_graphService, _routeParams, element) {
                    this._graphService = _graphService;
                    this._routeParams = _routeParams;
                    this.element = element;
                    this.graph = new graph_1.Graph();
                }
                GraphDetailComponent.prototype.ngOnInit = function () {
                    this.graph.id = this._routeParams.get('id');
                    this.loadGraphStructure();
                };
                GraphDetailComponent.prototype.loadGraphStructure = function () {
                    var _this = this;
                    this._graphService.getGraphSctructure(this.graph.id)
                        .then(function (graph) { return _this.graph = graph; });
                };
                GraphDetailComponent.prototype.onSave = function () {
                    this._graphService.save(this.graph)
                        .then(this.saveSucces, this.saveError);
                };
                GraphDetailComponent.prototype.saveSucces = function () {
                    alert("Успешно!");
                };
                GraphDetailComponent.prototype.saveError = function () {
                    alert("Ошибка!");
                };
                GraphDetailComponent.prototype.goBack = function () {
                    window.history.back();
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', graph_1.Graph)
                ], GraphDetailComponent.prototype, "graph", void 0);
                GraphDetailComponent = __decorate([
                    core_1.Component({
                        selector: 'my-graph-detail',
                        templateUrl: 'app/views/graphs/graph-detail.component.html',
                        styleUrls: ['app/assets/css/graph-detail.component.css'],
                        directives: [bar_graph_component_1.BarGraphComponent],
                    }), 
                    __metadata('design:paramtypes', [graph_service_1.GraphService, router_1.RouteParams, core_1.ElementRef])
                ], GraphDetailComponent);
                return GraphDetailComponent;
            }());
            exports_1("GraphDetailComponent", GraphDetailComponent);
        }
    }
});
//# sourceMappingURL=graph-detail.component.js.map