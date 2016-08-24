

import {Directive, ElementRef, Attribute, SimpleChange, Component} from 'angular2/core';
import {Graph} from "../models/graphs/graph";
import {Node} from "../models/graphs/node";
import {Edge} from "../models/graphs/edge";
import {GraphService} from "../services/graph.service";
import {NodeService} from "../services/node.service";
import {EdgeService} from "../services/edge.service";
import {Response} from "angular2/http";
// import * as d3 from 'd3';

declare var d3:any;

@Component({
    selector: 'bar-graph',
    templateUrl: 'app/views/graphs/bar-graph.component.html',
    styleUrls: ['app/assets/css/graph-detail.component.css'],
    properties: ['graph']
})


export class BarGraph
{
    protected graph: Graph;
    protected new_node_name: string;

    protected edges_in_path:Array<Edge>;

    protected edge_weight:number = 10;
    protected selected_node_first:Node;
    protected selected_node_second:Node;

    protected selected_edge_first:Edge;
    protected selected_edge_second:Edge;

    protected selected_edge_for_deleting:Edge;

    constructor (
        protected _nodeService: NodeService,
        protected _edgeService: EdgeService,
        protected elementRef: ElementRef )
    {
        this.edges_in_path = new Array<Edge>();
    }

    get graph_edges(){
        return this.graph.edges
    }

    get graph_nodes(){
        return this.graph.nodes
    }

    protected build(){

        console.log(this.graph)

        var svg = d3.select("svg");
        var width = +svg.attr("width"),
            height = +svg.attr("height");

        svg.selectAll("*").remove();

        var color = d3.scaleOrdinal(d3.schemeCategory20);

        var simulation = d3.forceSimulation()
            .force("link", d3.forceLink().id(function(d:any) { return d.id; }))
            .force("charge", d3.forceManyBody())
            .force("center", d3.forceCenter(width / 2, height / 2))


        var maxWeigth = 0;

        for(let edge of this.graph_edges){

            maxWeigth = edge.weight > maxWeigth ? edge.weight : maxWeigth
        }

        var $this = this;

        var links = this.graph_edges.map(edge=>{

            var item:any = {};

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
            .attr("class", function(d:any){

                return getLineClass.call(this, $this.edges_in_path, d, inPath);
            })
            .attr("stroke-width", function(d:any) {

                var stroke = 20.0 * d.weight / maxWeigth
                return stroke < 5 ? 5 : stroke;
            })
            .on("click", function(d:any){

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
            .data( this.graph_nodes)
            .enter()
            .append("svg:g")
            .attr("class", "node")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );

        node.append("svg:circle")
            .attr("class", "circle_default")
            .attr("font-size", "50px")
            .attr("stroke","black")
            .attr("x", function( d:any) { return d.x; })
            .attr("y", function( d:any) { return d.y; })
            .attr("r", 10)
            .on("click", function(d:any, i:any, e:any){
                this.nodeClick( d3.select(this))
            })


        node.append("svg:text")
            .attr("class", "nodetext")
            .attr("dx", 20)
            .attr("dy", ".35em")
            .text(function(d:any) {
                return d.nodename
            });


        simulation
            .nodes( this.graph_nodes)
            .on("tick", ticked);

        var minDistane = 100;

        simulation.force("link")
            .links(links)
            .distance( function(d:any){

                return d.weight > minDistane ? d.weight : minDistane;
            });

        function ticked() {
            link
                .attr("x1", function(d:any) { return d.source.x; })
                .attr("y1", function(d:any) { return d.source.y; })
                .attr("x2", function(d:any) { return d.target.x; })
                .attr("y2", function(d:any) { return d.target.y; });


            node
                .attr("transform", function(d:any) { return "translate(" + d.x + "," + d.y + ")"; });
        }

        function dragstarted(d:any) {
            if (!d3.event.active)
                simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(d:any) {
            d.fx = d3.event.x;
            d.fy = d3.event.y;
        }

        function dragended(d:any) {
            if (!d3.event.active)
                simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }

        function nodeClicked( d:any, i:any, e:any){

            console.log(d);
        }

        function getLineClass( edges_in_path:Array<Edge>, d:any, callback:Function){

            if( callback.call(this, edges_in_path, d.source, d.target) == true){

                return "line_in_path"
            }

            return "line_default";
        }

        function inPath (edges_in_path:Array<Edge>, id_source:any, id_target:any){

            for( let edge of edges_in_path){

                if(edge.node_first_id == id_source && edge.node_second_id == id_target || edge.node_first_id == id_target && edge.node_second_id == id_source  ){

                    return true;
                }// pass
            }

            return false;
        }
    }


    protected nodeClick( d3node:any){

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
    }

    onAddNode(){

        this._nodeService.create(this.graph, this.new_node_name)
            .then(
                result => {
                    this.graph.nodes.push( result as Node);
                    this.build();
                },
                error => alert("Rejected: " + error.message)
            );
    }

    onAddEdge(){

        if(!this.selected_node_first || !this.selected_node_second){
            alert("Not selected nodes!")
        }

        this._edgeService.create(this.graph, this.edge_weight, this.selected_node_first.id, this.selected_node_second.id)
            .then(
                result => {
                    this.graph.edges.push( result as Edge);
                    this.build();
                },
                error => alert("Rejected: " + error.message)
            )
    }

    onSelectFirstNode( obj:Node){

        this.selected_node_first = obj;

        console.log(this.selected_node_first);
    }


    onSelectSecondNode( obj:Node){

        this.selected_node_second = obj;

        console.log(this.selected_node_second);
    }

    onSelectSecondEdge( obj:Edge){

        this.selected_edge_first = obj;

        console.log(this.selected_edge_first);
    }


    onSelectFirstEdge( obj:Edge){

        this.selected_edge_second = obj;

        console.log(this.selected_edge_second);
    }

    protected __render(newValue: Graph): void
    {
        if( !newValue )
            return;

        this.build();
    }

    protected ngOnChanges( changes: { [propertyName: string]: SimpleChange } ): void
    {
        this.__render( this.graph );
    }
}