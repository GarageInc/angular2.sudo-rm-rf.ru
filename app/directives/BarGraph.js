System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var BarGraph;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            BarGraph = (function () {
                function BarGraph(elementRef) {
                    this.edges_in_path = [];
                    var el = elementRef.nativeElement; // reference to <bar-graph> element from the main template
                    var graph = d3.select("svg"); // D3 chart container
                }
                Object.defineProperty(BarGraph.prototype, "edges", {
                    get: function () {
                        return this.graph.edges;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(BarGraph.prototype, "nodes", {
                    get: function () {
                        return this.graph.nodes;
                    },
                    enumerable: true,
                    configurable: true
                });
                BarGraph.prototype.build = function () {
                    console.log(this.graph);
                    // var svg = d3.select("svg");
                    // var width = +svg.attr("width"),
                    //     height = +svg.attr("height");
                    //
                    // svg.selectAll("*").remove();
                    //
                    // var color = d3.scaleOrdinal(d3.schemeCategory20);
                    //
                    // var simulation = d3.forceSimulation()
                    //     .force("link", d3.forceLink().id(function(d:any) { return d.id; }))
                    //     .force("charge", d3.forceManyBody())
                    //     .force("center", d3.forceCenter(width / 2, height / 2))
                    //
                    // var maxWeigth = 0;
                    //
                    // this.edges.forEach(function(item){
                    //
                    //     maxWeigth = item.weight > maxWeigth ? item.weight : maxWeigth
                    // })
                    //
                    // var link = svg.append("g")
                    //     .attr("class", "links")
                    //     .selectAll("line")
                    //     .data(this.edges)
                    //     .enter().append("line")
                    //     .attr("class", getLineClass)
                    //     .attr("stroke-width", function(d:any) {
                    //
                    //         var stroke = 20.0 * d.weight / maxWeigth
                    //         return stroke < 5 ? 5 : stroke;
                    //     })
                    //     .on("click", function(d:any){
                    //
                    //         // if( selected_edge){
                    //         //     selected_edge.attr("class", getLineClass)
                    //         // }
                    //         //
                    //         // selected_edge = d3.select(this);
                    //         //
                    //         // selected_edge.attr("class", "line_selected");
                    //         //
                    //         // invalidateDeleteEdgeButton();
                    //     });
                    //
                    // function getLineClass( d:any){
                    //
                    //     if( this.inPath( d.source.id, d.target.id)){
                    //
                    //         return "line_in_path"
                    //     }
                    //
                    //     return "line_default";
                    // }
                    //
                    // var node = svg.append("g")
                    //     .attr("class", "nodes")
                    //     .selectAll("circle")
                    //     .data( this.nodes)
                    //     .enter()
                    //     .append("svg:g")
                    //     .attr("class", "node")
                    //     .call(d3.drag()
                    //         .on("start", dragstarted)
                    //         .on("drag", dragged)
                    //         .on("end", dragended)
                    //     );
                    //
                    // node.append("svg:circle")
                    //     .attr("class", "circle_default")
                    //     .attr("font-size", "50px")
                    //     .attr("stroke","black")
                    //     .attr("x", function( d:any) { return d.x; })
                    //     .attr("y", function( d:any) { return d.y; })
                    //     .attr("r", 10)
                    //     .on("click", function(d:any, i:any, e:any){
                    //         this.nodeClick( d3.select(this))
                    //     })
                    //
                    //
                    // node.append("svg:text")
                    //     .attr("class", "nodetext")
                    //     .attr("dx", 20)
                    //     .attr("dy", ".35em")
                    //     .text(function(d:any) {
                    //         return d.nodename
                    //     });
                    //
                    //
                    // simulation
                    //     .nodes( this.nodes)
                    //     .on("tick", ticked);
                    //
                    // var minDistane = 100;
                    //
                    // simulation.force("link")
                    //     .links( this.edges)
                    //     .distance( function(d:any){
                    //
                    //         return d.weight > minDistane ? d.weight : minDistane;
                    //     });
                    //
                    // function ticked() {
                    //     link
                    //         .attr("x1", function(d:any) { return d.source.x; })
                    //         .attr("y1", function(d:any) { return d.source.y; })
                    //         .attr("x2", function(d:any) { return d.target.x; })
                    //         .attr("y2", function(d:any) { return d.target.y; });
                    //
                    //
                    //     node
                    //         .attr("transform", function(d:any) { return "translate(" + d.x + "," + d.y + ")"; });
                    // }
                    //
                    // function dragstarted(d:any) {
                    //     if (!d3.event.active)
                    //         simulation.alphaTarget(0.3).restart();
                    //     d.fx = d.x;
                    //     d.fy = d.y;
                    // }
                    //
                    // function dragged(d:any) {
                    //     d.fx = d3.event.x;
                    //     d.fy = d3.event.y;
                    // }
                    //
                    // function dragended(d:any) {
                    //     if (!d3.event.active)
                    //         simulation.alphaTarget(0);
                    //     d.fx = null;
                    //     d.fy = null;
                    // }
                    //
                    // function nodeClicked( d:any, i:any, e:any){
                    //
                    //     console.log(d);
                    // }
                };
                BarGraph.prototype.inPath = function (source, target) {
                    for (var i = 0; i < this.edges_in_path.length; i++) {
                        var edge = this.edges_in_path[i];
                        if (edge.first_node == source && edge.second_node == target || edge.first_node == target && edge.second_node == source) {
                            return true;
                        } // pass
                    }
                    return false;
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
                BarGraph.prototype.__render = function (newValue) {
                    if (!newValue)
                        return;
                    this.build();
                };
                BarGraph.prototype.ngOnChanges = function (changes) {
                    this.__render(this.graph);
                };
                BarGraph = __decorate([
                    core_1.Directive({
                        selector: 'bar-graph',
                        properties: ['graph']
                    }), 
                    __metadata('design:paramtypes', [core_1.ElementRef])
                ], BarGraph);
                return BarGraph;
            }());
            exports_1("BarGraph", BarGraph);
        }
    }
});
//# sourceMappingURL=BarGraph.js.map