System.register(['angular2/core', "../services/node.service", "../services/edge.service"], function(exports_1, context_1) {
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
    var core_1, node_service_1, edge_service_1;
    var BarGraph;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (node_service_1_1) {
                node_service_1 = node_service_1_1;
            },
            function (edge_service_1_1) {
                edge_service_1 = edge_service_1_1;
            }],
        execute: function() {
            BarGraph = (function () {
                function BarGraph(_nodeService, _edgeService, elementRef) {
                    this._nodeService = _nodeService;
                    this._edgeService = _edgeService;
                    this.elementRef = elementRef;
                    this.edge_weight = 10;
                    this.edges_in_path = new Array();
                }
                Object.defineProperty(BarGraph.prototype, "graph_edges", {
                    get: function () {
                        return this.graph.edges;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BarGraph.prototype, "graph_nodes", {
                    get: function () {
                        return this.graph.nodes;
                    },
                    enumerable: true,
                    configurable: true
                });
                BarGraph.prototype.build = function () {
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
                        return getLineClass.call(this, $this.edges_in_path, d, inPath);
                    })
                        .attr("stroke-width", function (d) {
                        var stroke = 20.0 * d.weight / maxWeigth;
                        return stroke < 5 ? 5 : stroke;
                    })
                        .on("click", function (d) {
                        // if( selected_edge){
                        //     selected_edge.attr("class", getLineClass)
                        // }
                        //
                        // selected_edge = d3.select(this);
                        //
                        // selected_edge.attr("class", "line_selected");
                        //
                        // invalidateDeleteEdgeButton();
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
                        this.nodeClick(d3.select(this));
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
                    function nodeClicked(d, i, e) {
                        console.log(d);
                    }
                    function getLineClass(edges_in_path, d, callback) {
                        if (callback.call(this, edges_in_path, d.source, d.target) == true) {
                            return "line_in_path";
                        }
                        return "line_default";
                    }
                    function inPath(edges_in_path, id_source, id_target) {
                        for (var _i = 0, edges_in_path_1 = edges_in_path; _i < edges_in_path_1.length; _i++) {
                            var edge = edges_in_path_1[_i];
                            if (edge.node_first_id == id_source && edge.node_second_id == id_target || edge.node_first_id == id_target && edge.node_second_id == id_source) {
                                return true;
                            } // pass
                        }
                        return false;
                    }
                };
                BarGraph.prototype.nodeClick = function (d3node) {
                    console.log("blablabla");
                    // selected_node = d3node;
                    // selected_node.attr("class", "circle_for_delete")
                    //
                    // if( d3node === selected_node_first || d3node === selected_node_second){
                    //     return;
                    // }
                    //
                    //
                    // if( selected_node_first){
                    //     selected_node_first.attr("class", "circle_default")
                    // }
                    //
                    // selected_node_first = selected_node_second;
                    // selected_node_second = d3node;
                    //
                    //
                    // if( selected_node_first){
                    //
                    //     selected_node_first.attr("class",  "circle_for_path");
                    //     firstSelectBoxInPath.value = selected_node_first.datum().id;
                    // }
                    //
                    // if( selected_node_second){
                    //
                    //     selected_node_second.attr("class",  "circle_for_delete");
                    //     secondSelectBoxInPath.value = selected_node_second.datum().id;
                    // }
                    //
                    // invalidateDeleteNodeButton();
                    // // invalidateDeleteEdgeButton();
                };
                BarGraph.prototype.onAddNode = function () {
                    var _this = this;
                    this._nodeService.create(this.graph, this.new_node_name)
                        .then(function (result) {
                        _this.graph.nodes.push(result);
                        _this.build();
                    }, function (error) { return alert("Rejected: " + error.message); });
                };
                BarGraph.prototype.onAddEdge = function () {
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
                BarGraph.prototype.onSelectFirstNode = function (obj) {
                    this.selected_node_first = obj;
                    console.log(this.selected_node_first);
                };
                BarGraph.prototype.onSelectSecondNode = function (obj) {
                    this.selected_node_second = obj;
                    console.log(this.selected_node_second);
                };
                BarGraph.prototype.onSelectSecondEdge = function (obj) {
                    this.selected_edge_first = obj;
                    console.log(this.selected_edge_first);
                };
                BarGraph.prototype.onSelectFirstEdge = function (obj) {
                    this.selected_edge_second = obj;
                    console.log(this.selected_edge_second);
                };
                BarGraph.prototype.__render = function (newValue) {
                    if (!newValue)
                        return;
                    this.build();
                };
                BarGraph.prototype.ngOnChanges = function (changes) {
                    this.__render(this.graph);
                };
                BarGraph = __decorate([
                    core_1.Component({
                        selector: 'bar-graph',
                        templateUrl: 'app/views/graphs/bar-graph.component.html',
                        styleUrls: ['app/assets/css/graph-detail.component.css'],
                        properties: ['graph']
                    }), 
                    __metadata('design:paramtypes', [node_service_1.NodeService, edge_service_1.EdgeService, core_1.ElementRef])
                ], BarGraph);
                return BarGraph;
            }());
            exports_1("BarGraph", BarGraph);
        }
    }
});
//# sourceMappingURL=bar-graph.component.js.map