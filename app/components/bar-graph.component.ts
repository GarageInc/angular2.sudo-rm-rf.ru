

import {Directive, ElementRef, Attribute, SimpleChange, Component, ViewEncapsulation} from 'angular2/core';
import {Graph} from "../models/graphs/graph";
import {Node} from "../models/graphs/node";
import {Edge} from "../models/graphs/edge";
import {GraphService} from "../services/graph.service";
import {NodeService} from "../services/node.service";
import {EdgeService} from "../services/edge.service";
import {Response} from "angular2/http";
import {UserState} from "../models/states/user.state";
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

    public get selected_edge_for_deleting(){
        if( this.selected_edge_for_deleting_domEl){

            return this.selected_edge_for_deleting_domEl.datum();
        }
    };


    // -->

    protected current_selected_node_d3DomEl:any;
    protected first_selected_node_d3DomEl:any;
    protected second_selected_node_d3DomEl:any;

    public selected_node_current:Node;
    public selected_node_first:Node;
    public selected_node_second:Node;

    public setSelectedNodeFirst( node:Node){

        if(node){

            this.selected_node_first = node;
        }
    }
    public setSelectedNodeSecond( node:Node){

        if(node) {

            this.selected_node_second = node;
        }
    }
    public setSelectedNodeCurrent( node:Node){

        if(node) {

            this.selected_node_current = node;
        }
    }
    // <--

    constructor (
        protected _graphService: GraphService,
        protected _nodeService: NodeService,
        protected _edgeService: EdgeService
    )
    {
        this.edges_in_path= new Array<Edge>();
    }

    get graph_edges(){
        return this.graph.edges
    }

    get graph_nodes(){
        return this.graph.nodes
    }

    protected build(){

        var svg = d3.select("svg");
        console.log(svg)
        var width = parseInt(svg.style("width")),
            height = parseInt(svg.style("height"));

        console.log("width: " + width)
        console.log("height: " + height)

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

                return getLineClass.call(this, $this.edges_in_path, d.source, d.target, inPath);
            })
            .attr("stroke-width", function(d:any) {

                var stroke = 20.0 * d.weight / maxWeigth
                return stroke < 5 ? 5 : stroke;
            })
            .on("click", function(d:any, i:any, e:any){

                if( $this.selected_edge_for_deleting_domEl){
                    $this.selected_edge_for_deleting_domEl.attr("class", function(data:any){

                        console.log($this.selected_edge_for_deleting)
                        console.log(data)
                        var csscl = getLineClass.call(this, $this.edges_in_path, data.source.id, data.target.id, inPath)
                        console.log(csscl)
                        return csscl;
                    })
                }

                $this.selected_edge_for_deleting_domEl = d3.select(this);

                $this.selected_edge_for_deleting_domEl.attr("class", "line_selected");
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

        function getLineClass( edges_in_path:Array<Edge>, source_id:string, target_id:string, callback:Function){

            if( callback.call(this, edges_in_path, source_id, target_id) == true){

                return "line_in_path"
            }

            return "line_default";
        }

        function inPath (edges_in_path:Array<Edge>, id_source:any, id_target:any){

            console.log( arguments)

            for( let edge of edges_in_path){

                if( edge.node_first_id == id_source && edge.node_second_id == id_target
                || edge.node_first_id == id_target && edge.node_second_id == id_source  ){

                    return true;
                }// pass
            }

            return false;
        }

        function nodeClick( d3node:any, scope:any){

            scope.current_selected_node_d3DomEl = d3node;
            if(scope.current_selected_node_d3DomEl){

                scope.setSelectedNodeCurrent(scope.current_selected_node_d3DomEl.datum())
                scope.current_selected_node_d3DomEl.attr("class", "circle_for_delete")
            }

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
                scope.setSelectedNodeFirst(scope.selected_node_first_d3DomEl.datum())
            }// pass

            if( scope.selected_node_second_d3DomEl){

                scope.selected_node_second_d3DomEl.attr("class",  "circle_for_delete");
                scope.setSelectedNodeSecond(scope.selected_node_second_d3DomEl.datum())
            }// pass
        }
    }

    onAddNode(){

        this._nodeService.create(this.graph, this.new_node_name)
            .then(
                result => {
                    if(result){

                        this.graph.nodes.push( result as Node);
                        this.build();
                    } else {

                        alert("Error by creating new node!")
                    }
                },
                error => alert("Rejected: " + error.message)
            );
    }

    onAddEdge(){

        if(!this.selected_node_first || !this.selected_node_second){

            alert("Not selected nodes!")
        } else {

            if( this.selected_node_first.id == this.selected_node_second){

                alert("Can't create such edge!")
            } else {

                this._edgeService.create(this.graph, this.edge_weight, this.selected_node_first.id, this.selected_node_second.id)
                    .then(
                        result => {
                            if(result){

                                this.graph.edges.push( result as Edge);
                                this.build();
                            } else {

                                alert("Error by creating new edge!")
                            }
                        },
                        error => alert("Rejected: " + error.message)
                    )
            }
        }
    }

    onSelectFirstNode( obj:Node){

        this.setSelectedNodeFirst( obj)
    }


    onSelectSecondNode( obj:Node){

        this.setSelectedNodeSecond( obj)
    }

    onDeleteEdge(){

        this._edgeService.delete(this.graph, this.selected_edge_for_deleting.edge_id)
            .then(
                result=>{

                    if(result){

                        this.graph.deleteEdgeById(this.selected_edge_for_deleting.edge_id)

                        this.build();
                    } else {

                        alert("Error by deleting edge!")
                    }
                },
                error => alert("Rejected: " + error.message)
            );
    }

    onDeleteNode(){

        this._nodeService.delete( this.graph, this.selected_node_current.id)
            .then(
                result=>{

                    if(result){

                        this.graph.deleteNodeById(this.selected_node_current.id);

                        this.build();
                    } else {
                        alert("Error by adding!")
                    }
                },
                error => alert("Rejected: " + error.message)
            )
    }

    protected length_between_nodes:number = 0;
    protected nodes_path:string;
    protected edges_in_path:Array<Edge>;

    onFindPath(){

        this._graphService.findpath(this.graph, this.selected_node_first.id, this.selected_node_second.id)
            .then(
                result=>{

                    this.edges_in_path = new Array<Edge>();

                    this.nodes_path = "";

                    if( result.path.length > 0 && this.graph_edges.length > 0){

                        for (let index_first = 0, index_second = index_first+1; index_second < result.path.length ;index_first++, index_second++){

                            var id_source= result.path[index_first];
                            var id_target= result.path[index_second];

                            for(let edge of this.graph_edges){

                                if( id_source == edge.node_first_id && id_target == edge.node_second_id
                                || id_source == edge.node_second_id && id_target == edge.node_first_id){
                                    this.edges_in_path.push( edge);

                                    break;
                                }
                            }
                        }

                        console.log(result.path)
                        for( let index = 0; index < result.path.length; index++){

                            var node_id = result.path[index];

                            console.log(node_id)

                            for( let node of this.graph_nodes){
                                if( node_id == node.id){

                                    this.nodes_path+= "[" + node.nodename + "]";
                                    break;
                                }
                            }
                        }

                        console.log(this.nodes_path)
                    }

                    this.length_between_nodes = +result.length;

                    this.build();
                },
                error => alert("Rejected: " + error.message)
            )
    }

    public get isGraphOwner():Boolean{

        return this.graph.user_id == UserState.activeUser.id;
    }

    protected __render(newValue: Graph): void
    {
        if( !newValue )
            return;

        if(this.graph_nodes.length > 0){

            this.setSelectedNodeFirst(this.graph_nodes[0]);
            this.setSelectedNodeSecond(this.graph_nodes[0]);

        }// pass

        this.build();
    }

    protected ngOnChanges( changes: { [propertyName: string]: SimpleChange } ): void
    {
        this.__render( this.graph );
    }
}