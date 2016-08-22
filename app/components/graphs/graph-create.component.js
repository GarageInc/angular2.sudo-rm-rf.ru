System.register(['angular2/core', 'angular2/router', './../../services/graph.service'], function(exports_1, context_1) {
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
    var core_1, router_1, graph_service_1;
    var GraphCreateComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
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
                }
                GraphCreateComponent.prototype.onCreate = function () {
                    var _this = this;
                    this._graphService.create(this.name).subscribe(function (result) {
                        console.log("Result: " + result);
                        if (result) {
                            _this._router.navigate(['Dashboard']);
                        }
                        else {
                            alert("Не удалось создать!");
                        }
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], GraphCreateComponent.prototype, "name", void 0);
                GraphCreateComponent = __decorate([
                    core_1.Component({
                        selector: 'my-graph-create',
                        templateUrl: 'app/views/graphs/graph-create.component.html',
                        styleUrls: ['app/assets/css/graph-create.component.css']
                    }), 
                    __metadata('design:paramtypes', [graph_service_1.GraphService, router_1.RouteParams, router_1.Router])
                ], GraphCreateComponent);
                return GraphCreateComponent;
            }());
            exports_1("GraphCreateComponent", GraphCreateComponent);
        }
    }
});
//# sourceMappingURL=graph-create.component.js.map