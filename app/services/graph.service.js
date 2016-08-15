System.register(['angular2/core', '../models/graph', 'angular2/http', 'rxjs/Observable', 'rxjs/Rx'], function(exports_1) {
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
    var core_1, graph_1, http_1, Observable_1;
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
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            GraphService = (function () {
                function GraphService(http) {
                    this.http = http;
                }
                GraphService.prototype.getGraphs = function () {
                    return this.http.get("http://127.0.0.1:3000/index.php/graph/index")
                        .map(this.extractData)
                        .catch(this.handleError)
                        .toPromise();
                };
                GraphService.prototype.extractData = function (res) {
                    var body = res.json();
                    var graphs = [];
                    for (var _i = 0; _i < body.length; _i++) {
                        var entry = body[_i];
                        var graph = new graph_1.Graph();
                        graph.fillFromJSON(entry);
                        graphs.push(graph);
                    }
                    console.log(graphs);
                    return graphs;
                };
                GraphService.prototype.handleError = function (error) {
                    // In a real world app, we might use a remote logging infrastructure
                    // We'd also dig deeper into the error to get a better message
                    var errMsg = (error.message) ? error.message :
                        error.status ? error.status + " - " + error.statusText : 'Server error';
                    console.error(errMsg); // log to console instead
                    return Observable_1.Observable.throw(errMsg);
                };
                GraphService.prototype.getGraph = function (id) {
                    return this.getGraphs().then(function (heroes) { return heroes.filter(function (hero) { return hero.id == id; })[0]; });
                };
                GraphService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], GraphService);
                return GraphService;
            })();
            exports_1("GraphService", GraphService);
        }
    }
});
//# sourceMappingURL=graph.service.js.map