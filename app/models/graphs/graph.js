System.register(["../base/Synchronizable", "./edge", "./node"], function(exports_1) {
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
                    this.nodes = [];
                    this.edges = [];
                }
                Graph.prototype.fillStructure = function (body) {
                    this.fillFromJSON(body);
                    this.fillNodes(body.nodes);
                    this.fillEdges(body.edges);
                };
                Graph.prototype.fillNodes = function (json_nodes) {
                    this.nodes = [];
                    for (var _i = 0; _i < json_nodes.length; _i++) {
                        var entry = json_nodes[_i];
                        var node = new node_1.Node();
                        node.fillFromJSON(entry);
                        this.nodes.push(node);
                    }
                };
                Graph.prototype.fillEdges = function (json_edges) {
                    this.edges = [];
                    for (var _i = 0; _i < json_edges.length; _i++) {
                        var entry = json_edges[_i];
                        var edge = new edge_1.Edge();
                        edge.fillFromJSON(entry);
                        this.edges.push(edge);
                    }
                };
                Graph.prototype.deleteNodeById = function (node_id) {
                    var edges_ids = [];
                    for (var i = 0; i < this.edges.length; i++) {
                        if (this.edges[i].node_first_id == node_id || this.edges[i].node_second_id == node_id) {
                            edges_ids.push(this.edges[i].id);
                        }
                    }
                    for (var _i = 0; _i < edges_ids.length; _i++) {
                        var id = edges_ids[_i];
                        this.deleteEdgeById(id);
                    }
                    var index = -1;
                    for (var i = 0; i < this.nodes.length; i++) {
                        if (this.nodes[i].id == node_id) {
                            index = i;
                            break;
                        }
                    }
                    if (index > -1) {
                        this.nodes.splice(index, 1);
                    }
                };
                Graph.prototype.deleteEdgeById = function (edge_id) {
                    var index = -1;
                    for (var i = 0; i < this.edges.length; i++) {
                        if (this.edges[i].id == edge_id) {
                            index = i;
                            break;
                        }
                    }
                    if (index > -1) {
                        this.edges.splice(index, 1);
                    }
                };
                return Graph;
            })(Synchronizable_1.Synchronizable);
            exports_1("Graph", Graph);
        }
    }
});
//# sourceMappingURL=graph.js.map