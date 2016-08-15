System.register(['angular2/core', 'angular2/router', './services/graph.service'], function(exports_1) {
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
    var core_1, router_1, graph_service_1;
    var DashboardComponent;
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
            DashboardComponent = (function () {
                function DashboardComponent(_router, _graphService) {
                    this._router = _router;
                    this._graphService = _graphService;
                    this.graphs = [];
                }
                DashboardComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._graphService.getGraphs()
                        .then(function (graphs) { return _this.graphs = graphs.slice(1, 5); });
                };
                DashboardComponent.prototype.gotoDetail = function (graph) {
                    var link = ['HeroDetail', { id: graph.id }];
                    this._router.navigate(link);
                };
                DashboardComponent = __decorate([
                    core_1.Component({
                        selector: 'my-dashboard',
                        templateUrl: 'app/views/dashboard.component.html',
                        styleUrls: ['app/assets/css/dashboard.component.css']
                    }), 
                    __metadata('design:paramtypes', [router_1.Router, graph_service_1.GraphService])
                ], DashboardComponent);
                return DashboardComponent;
            })();
            exports_1("DashboardComponent", DashboardComponent);
        }
    }
});
//# sourceMappingURL=dashboard.component.js.map