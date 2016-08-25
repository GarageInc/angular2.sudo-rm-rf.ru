System.register(['angular2/core', "../services/graph.service", "../services/node.service", "../services/edge.service"], function(exports_1, context_1) {
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
    var core_1, graph_service_1, node_service_1, edge_service_1;
    var BarGraphComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (graph_service_1_1) {
                graph_service_1 = graph_service_1_1;
            },
            function (node_service_1_1) {
                node_service_1 = node_service_1_1;
            },
            function (edge_service_1_1) {
                edge_service_1 = edge_service_1_1;
            }],
        execute: function() {
            BarGraphComponent = (function () {
                // <--
                function BarGraphComponent(_graphService, _nodeService, _edgeService) {
                    this._graphService = _graphService;
                    this._nodeService = _nodeService;
                    this._edgeService = _edgeService;
                    this.edge_weight = 10;
                    this.length_between_nodes = 0;
                    this.nodes_ids_in_path = new Array();
                }
                Object.defineProperty(BarGraphComponent.prototype, "selected_node_first", {
                    get: function () {
                        if (this.first_selected_node_d3DomEl)
                            return this.first_selected_node_d3DomEl.datum();
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(BarGraphComponent.prototype, "selected_node_second", {
                    get: function () {
                        if (this.second_selected_node_d3DomEl)
                            return this.second_selected_node_d3DomEl.datum();
                    },
                    enumerable: true,
                    configurable: true
                });
                ;
                Object.defineProperty(BarGraphComponent.prototype, "selected_node_for_deleting", {
                    get: function () {
                        if (this.current_selected_node_d3DomEl)
                            return this.current_selected_node_d3DomEl.datum();
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BarGraphComponent.prototype, "graph_edges", {
                    get: function () {
                        return this.graph.edges;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BarGraphComponent.prototype, "graph_nodes", {
                    get: function () {
                        return this.graph.nodes;
                    },
                    enumerable: true,
                    configurable: true
                });
                BarGraphComponent.prototype.build = function () {
                    console.log(this.graph);
                    var svg = d3.select("svg");
                    var width = +svg.attr("width"), height = +svg.attr("height");
                    svg.selectAll("*").remove();
                    var color = d3.scaleOrdinal(d3.schemeCategory20);
                    var simulation = d3.forceSimulation()
                        .force("link", d3.forceLink().id(function (d) { return d.id; }))
                        .force("charge", d3.forceManyBody())
                        .force("center", d3.forceCenter(width / 2, height / 2));
                    var maxWeigth = 0;
                    for (var _i = 0, _a = this.graph_edges; _i < _a.length; _i++) {
                        var edge = _a[_i];
                        maxWeigth = edge.weight > maxWeigth ? edge.weight : maxWeigth;
                    }
                    var $this = this;
                    var links = this.graph_edges.map(function (edge) {
                        var item = {};
                        item.edge_id = edge.id;
                        item.index = 0;
                        item.x = 0;
                        item.y = 0;
                        item.source = edge.node_first_id;
                        item.target = edge.node_second_id;
                        item.weight = edge.weight;
                        return item;
                    });
                    var link = svg.append("g")
                        .attr("class", "links")
                        .selectAll("line")
                        .data(links)
                        .enter().append("line")
                        .attr("class", function (d) {
                        return getLineClass.call(this, $this.nodes_ids_in_path, d, inPath);
                    })
                        .attr("stroke-width", function (d) {
                        var stroke = 20.0 * d.weight / maxWeigth;
                        return stroke < 5 ? 5 : stroke;
                    })
                        .on("click", function (d, i, e) {
                        if ($this.selected_edge_for_deleting_domEl) {
                            $this.selected_edge_for_deleting_domEl.attr("class", function () {
                                return getLineClass.call(this, $this.nodes_ids_in_path, d, inPath);
                            });
                        }
                        $this.selected_edge_for_deleting_domEl = d3.select(this);
                        $this.selected_edge_for_deleting_domEl.attr("class", "line_selected");
                        $this.selected_edge_for_deleting = d;
                    });
                    var node = svg.append("g")
                        .attr("class", "nodes")
                        .selectAll("circle")
                        .data(this.graph_nodes)
                        .enter()
                        .append("svg:g")
                        .attr("class", "node")
                        .call(d3.drag()
                        .on("start", dragstarted)
                        .on("drag", dragged)
                        .on("end", dragended));
                    node.append("svg:circle")
                        .attr("class", "circle_default")
                        .attr("font-size", "50px")
                        .attr("stroke", "black")
                        .attr("x", function (d) { return d.x; })
                        .attr("y", function (d) { return d.y; })
                        .attr("r", 10)
                        .on("click", function (d, i, e) {
                        nodeClick.call(this, d3.select(this), $this);
                    });
                    node.append("svg:text")
                        .attr("class", "nodetext")
                        .attr("dx", 20)
                        .attr("dy", ".35em")
                        .text(function (d) {
                        return d.nodename;
                    });
                    simulation
                        .nodes(this.graph_nodes)
                        .on("tick", ticked);
                    var minDistane = 100;
                    simulation.force("link")
                        .links(links)
                        .distance(function (d) {
                        return d.weight > minDistane ? d.weight : minDistane;
                    });
                    function ticked() {
                        link
                            .attr("x1", function (d) { return d.source.x; })
                            .attr("y1", function (d) { return d.source.y; })
                            .attr("x2", function (d) { return d.target.x; })
                            .attr("y2", function (d) { return d.target.y; });
                        node
                            .attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
                    }
                    function dragstarted(d) {
                        if (!d3.event.active)
                            simulation.alphaTarget(0.3).restart();
                        d.fx = d.x;
                        d.fy = d.y;
                    }
                    function dragged(d) {
                        d.fx = d3.event.x;
                        d.fy = d3.event.y;
                    }
                    function dragended(d) {
                        if (!d3.event.active)
                            simulation.alphaTarget(0);
                        d.fx = null;
                        d.fy = null;
                    }
                    function getLineClass(nodes_ids_in_path, d, callback) {
                        if (callback.call(this, nodes_ids_in_path, d.source, d.target) == true) {
                            return "line_in_path";
                        }
                        return "line_default";
                    }
                    function inPath(nodes_ids_in_path, id_source, id_target) {
                        for (var _i = 0, nodes_ids_in_path_1 = nodes_ids_in_path; _i < nodes_ids_in_path_1.length; _i++) {
                            var node_id = nodes_ids_in_path_1[_i];
                            if (node_id == id_source || node_id == id_target) {
                                return true;
                            } // pass
                        }
                        return false;
                    }
                    function nodeClick(d3node, scope) {
                        scope.current_selected_node_d3DomEl = d3node;
                        scope.current_selected_node_d3DomEl.attr("class", "circle_for_delete");
                        if (d3node === scope.selected_node_first_d3DomEl || d3node === scope.selected_node_second_d3DomEl) {
                            return;
                        }
                        if (scope.selected_node_first_d3DomEl) {
                            scope.selected_node_first_d3DomEl.attr("class", "circle_default");
                        }
                        scope.selected_node_first_d3DomEl = scope.selected_node_second_d3DomEl;
                        scope.selected_node_second_d3DomEl = d3node;
                        if (scope.selected_node_first_d3DomEl) {
                            scope.selected_node_first_d3DomEl.attr("class", "circle_for_path");
                        } // pass
                        if (scope.selected_node_second_d3DomEl) {
                            scope.selected_node_second_d3DomEl.attr("class", "circle_for_delete");
                        } // pass
                    }
                };
                BarGraphComponent.prototype.onAddNode = function () {
                    var _this = this;
                    this._nodeService.create(this.graph, this.new_node_name)
                        .then(function (result) {
                        _this.graph.nodes.push(result);
                        _this.build();
                    }, function (error) { return alert("Rejected: " + error.message); });
                };
                BarGraphComponent.prototype.onAddEdge = function () {
                    var _this = this;
                    if (!this.selected_node_first || !this.selected_node_second) {
                        alert("Not selected nodes!");
                    }
                    this._edgeService.create(this.graph, this.edge_weight, this.selected_node_first.id, this.selected_node_second.id)
                        .then(function (result) {
                        _this.graph.edges.push(result);
                        _this.build();
                    }, function (error) { return alert("Rejected: " + error.message); });
                };
                BarGraphComponent.prototype.onSelectFirstNode = function (obj) {
                    this.selected_node_first = obj;
                    console.log(this.selected_node_first);
                };
                BarGraphComponent.prototype.onSelectSecondNode = function (obj) {
                    this.selected_node_second = obj;
                    console.log(this.selected_node_second);
                };
                BarGraphComponent.prototype.onDeleteEdge = function () {
                    var _this = this;
                    this._edgeService.delete(this.selected_edge_for_deleting.edge_id)
                        .then(function (result) {
                        _this.graph.deleteEdgeById(_this.selected_edge_for_deleting.edge_id);
                        _this.build();
                    }, function (error) { return alert("Rejected: " + error.message); });
                };
                BarGraphComponent.prototype.onDeleteNode = function () {
                    var _this = this;
                    this._nodeService.delete(this.selected_node_for_deleting.id)
                        .then(function (result) {
                        _this.graph.deleteNodeById(_this.selected_node_for_deleting.id);
                        _this.build();
                    }, function (error) { return alert("Rejected: " + error.message); });
                };
                Object.defineProperty(BarGraphComponent.prototype, "nodes_in_path", {
                    get: function () {
                        var nodes = new Array();
                        if (this.nodes_ids_in_path.length > 0 && this.graph_nodes.length > 0) {
                            for (var _i = 0, _a = this.nodes_ids_in_path; _i < _a.length; _i++) {
                                var id = _a[_i];
                                for (var _b = 0, _c = this.graph_nodes; _b < _c.length; _b++) {
                                    var node = _c[_b];
                                    if (id == node.id) {
                                        nodes.push(node);
                                    }
                                }
                            }
                        } // pass
                        return nodes;
                    },
                    enumerable: true,
                    configurable: true
                });
                BarGraphComponent.prototype.onFindPath = function () {
                    var _this = this;
                    this._graphService.findPath(this.graph.id, this.selected_node_first.id, this.selected_node_second.id)
                        .then(function (result) {
                        _this.nodes_ids_in_path = new Array();
                        for (var item in result.path) {
                            _this.nodes_ids_in_path.push(item);
                        }
                        _this.length_between_nodes = +result.length;
                    }, function (error) { return alert("Rejected: " + error.message); });
                };
                BarGraphComponent.prototype.__render = function (newValue) {
                    if (!newValue)
                        return;
                    this.build();
                };
                BarGraphComponent.prototype.ngOnChanges = function (changes) {
                    this.__render(this.graph);
                };
                BarGraphComponent = __decorate([
                    core_1.Component({
                        encapsulation: core_1.ViewEncapsulation.None,
                        selector: 'bar-graph',
                        templateUrl: 'app/views/graphs/bar-graph.component.html',
                        styleUrls: ['app/assets/css/bar-graph.component.css'],
                        properties: ['graph']
                    }), 
                    __metadata('design:paramtypes', [graph_service_1.GraphService, node_service_1.NodeService, edge_service_1.EdgeService])
                ], BarGraphComponent);
                return BarGraphComponent;
            }());
            exports_1("BarGraphComponent", BarGraphComponent);
        }
    }
});
//# sourceMappingURL=bar-graph.component.js.map