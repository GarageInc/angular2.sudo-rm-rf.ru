System.register(["../base/Synchronizable"], function(exports_1) {
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Synchronizable_1;
    var Edge;
    return {
        setters:[
            function (Synchronizable_1_1) {
                Synchronizable_1 = Synchronizable_1_1;
            }],
        execute: function() {
            Edge = (function (_super) {
                __extends(Edge, _super);
                function Edge() {
                    _super.apply(this, arguments);
                }
                return Edge;
            })(Synchronizable_1.Synchronizable);
            exports_1("Edge", Edge);
        }
    }
});
//# sourceMappingURL=edge.js.map