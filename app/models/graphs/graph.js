System.register(["../base/Synchronizable", "./edge", "./node"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Synchronizable_1, edge_1, node_1;
    var Graph;
    return {
        setters:[
            function (Synchronizable_1_1) {
                Synchronizable_1 = Synchronizable_1_1;
            },
            function (edge_1_1) {
                edge_1 = edge_1_1;
            },
            function (node_1_1) {
                node_1 = node_1_1;
            }],
        execute: function() {
            Graph = (function (_super) {
                __extends(Graph, _super);
                function Graph() {
                    _super.apply(this, arguments);
                }
                Graph.prototype.fillNodes = function (json_nodes) {
                    this.nodes = [];
                    for (var _i = 0, json_nodes_1 = json_nodes; _i < json_nodes_1.length; _i++) {
                        var entry = json_nodes_1[_i];
                        var node = new node_1.Node();
                        node.fillFromJSON(entry);
                        this.nodes.push(node);
                    }
                };
                Graph.prototype.fillEdges = function (json_edges) {
                    this.edges = [];
                    for (var _i = 0, json_edges_1 = json_edges; _i < json_edges_1.length; _i++) {
                        var entry = json_edges_1[_i];
                        var edge = new edge_1.Edge();
                        edge.fillFromJSON(entry);
                        this.edges.push(edge);
                    }
                };
                return Graph;
            }(Synchronizable_1.Synchronizable));
            exports_1("Graph", Graph);
        }
    }
});
//# sourceMappingURL=graph.js.map