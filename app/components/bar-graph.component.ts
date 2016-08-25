

import {Directive, ElementRef, Attribute, SimpleChange, Component, ViewEncapsulation} from 'angular2/core';
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
    encapsulation: ViewEncapsulation.None,
    selector: 'bar-graph',
    templateUrl: 'app/views/graphs/bar-graph.component.html',
    styleUrls: ['app/assets/css/bar-graph.component.css'],
    properties: ['graph']
})


export class BarGraphComponent
{
    protected graph: Graph;
    protected new_node_name: string;

    protected edge_weight:number = 10;

    protected selected_edge_for_deleting_domEl:any;
    protected selected_edge_for_deleting:any;


    // -->

    protected current_selected_node_d3DomEl:any;
    protected first_selected_node_d3DomEl:any;
    protected second_selected_node_d3DomEl:any;

    public get selected_node_first(){

        if( this.first_selected_node_d3DomEl)
            return this.first_selected_node_d3DomEl.datum();
    };
    public get selected_node_second(){

        if( this.second_selected_node_d3DomEl)
            return this.second_selected_node_d3DomEl.datum();
    };

    public get selected_node_for_deleting(){

        if( this.current_selected_node_d3DomEl)
            return this.current_selected_node_d3DomEl.datum();
    }
    // <--

    constructor (
        protected _graphService: GraphService,
        protected _nodeService: NodeService,
        protected _edgeService: EdgeService
    )
    {
        this.nodes_ids_in_path = new Array<string>();
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
            .attr("class", function(d:any){

                return getLineClass.call(this, $this.nodes_ids_in_path, d, inPath);
            })
            .attr("stroke-width", function(d:any) {

                var stroke = 20.0 * d.weight / maxWeigth
                return stroke < 5 ? 5 : stroke;
            })
            .on("click", function(d:any, i:any, e:any){

                if( $this.selected_edge_for_deleting_domEl){
                    $this.selected_edge_for_deleting_domEl.attr("class", function(){
                        return getLineClass.call(this, $this.nodes_ids_in_path, d, inPath)
                    })
                }

                $this.selected_edge_for_deleting_domEl = d3.select(this);

                $this.selected_edge_for_deleting_domEl.attr("class", "line_selected");

                $this.selected_edge_for_deleting = d;
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
                nodeClick.call( this, d3.select(this), $this)
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

        function getLineClass( nodes_ids_in_path:Array<Edge>, d:any, callback:Function){

            if( callback.call(this, nodes_ids_in_path, d.source, d.target) == true){

                return "line_in_path"
            }

            return "line_default";
        }

        function inPath (nodes_ids_in_path:Array<string>, id_source:any, id_target:any){

            for( let node_id of nodes_ids_in_path){

                if( node_id == id_source || node_id == id_target){

                    return true;
                }// pass
            }

            return false;
        }

        function nodeClick( d3node:any, scope:any){

            scope.current_selected_node_d3DomEl = d3node;
            scope.current_selected_node_d3DomEl.attr("class", "circle_for_delete")

            if( d3node === scope.selected_node_first_d3DomEl || d3node === scope.selected_node_second_d3DomEl){
                return;
            }


            if( scope.selected_node_first_d3DomEl){
                scope.selected_node_first_d3DomEl.attr("class", "circle_default")
            }

            scope.selected_node_first_d3DomEl = scope.selected_node_second_d3DomEl;
            scope.selected_node_second_d3DomEl = d3node;


            if( scope.selected_node_first_d3DomEl){

                scope.selected_node_first_d3DomEl.attr("class",  "circle_for_path");
            }// pass

            if( scope.selected_node_second_d3DomEl){

                scope.selected_node_second_d3DomEl.attr("class",  "circle_for_delete");
            }// pass
        }
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

    onDeleteEdge(){

        this._edgeService.delete( this.selected_edge_for_deleting.edge_id)
            .then(
                result=>{

                    this.graph.deleteEdgeById(this.selected_edge_for_deleting.edge_id)


                    this.build();
                },
                error => alert("Rejected: " + error.message)
            );
    }

    onDeleteNode(){

        this._nodeService.delete( this.selected_node_for_deleting.id)
            .then(
                result=>{
                    this.graph.deleteNodeById(this.selected_node_for_deleting.id);

                    this.build();
                },
                error => alert("Rejected: " + error.message)
            )
    }

    protected length_between_nodes:number = 0;
    protected nodes_ids_in_path:Array<string>;

    public get nodes_in_path():Array<Node>{

        var nodes:Array<Node> = new Array<Node>();

        if( this.nodes_ids_in_path.length > 0 && this.graph_nodes.length>0){

            for(let id of this.nodes_ids_in_path){
                for(let node of this.graph_nodes){

                    if( id == node.id){
                        nodes.push( node);
                    }
                }
            }
        } // pass

        return nodes;
    }

    onFindPath(){

        this._graphService.findPath(this.graph.id, this.selected_node_first.id, this.selected_node_second.id)
            .then(
                result=>{

                    this.nodes_ids_in_path = new Array<string>();
                    
                    for( let item in result.path){
                        this.nodes_ids_in_path.push( item)
                    }

                    this.length_between_nodes = +result.length;
                },
                error => alert("Rejected: " + error.message)
            )
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