System.register([], function(exports_1) {
    var Graph;
    return {
        setters:[],
        execute: function() {
            Graph = (function () {
                function Graph() {
                }
                Graph.prototype.fillFromJSON = function (jsonObj) {
                    for (var propName in jsonObj) {
                        this[propName] = jsonObj[propName];
                    }
                };
                return Graph;
            })();
            exports_1("Graph", Graph);
        }
    }
});
//# sourceMappingURL=graph.js.map