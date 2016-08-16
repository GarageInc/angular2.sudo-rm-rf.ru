System.register(["./base/Synchronizable"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Synchronizable_1;
    var Graph;
    return {
        setters:[
            function (Synchronizable_1_1) {
                Synchronizable_1 = Synchronizable_1_1;
            }],
        execute: function() {
            Graph = (function (_super) {
                __extends(Graph, _super);
                function Graph() {
                    _super.apply(this, arguments);
                }
                return Graph;
            })(Synchronizable_1.Synchronizable);
            exports_1("Graph", Graph);
        }
    }
});
//# sourceMappingURL=graph.js.map