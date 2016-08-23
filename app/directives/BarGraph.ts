

import { Directive, ElementRef, Attribute, SimpleChange } from 'angular2/core';
import {Graph} from "../models/graphs/graph";
// import * as d3 from 'd3';

declare var d3:any;

@Directive({
    selector: 'bar-graph',
    properties: ['graph']
})

export class BarGraph
{
    protected graph: Graph;
    protected divs: any;
    protected svg:any;

    protected edges_in_path:Array<any> = [];

    constructor ( elementRef: ElementRef )
    {
        let el: any    = elementRef.nativeElement;  // reference to <bar-graph> element from the main template
        let graph: any = d3.select("svg");             // D3 chart container
    }

    get edges(){
        return this.graph.edges
    }

    get nodes(){
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

        this.edges.forEach(function(item){

            maxWeigth = item.weight > maxWeigth ? item.weight : maxWeigth
        })

        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(this.edges)
            .enter().append("line")
            .attr("class", getLineClass)
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

        function getLineClass( d:any){

            if( this.inPath( d.source.id, d.target.id)){

                return "line_in_path"
            }

            return "line_default";
        }

        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data( this.nodes)
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
            .nodes( this.nodes)
            .on("tick", ticked);

        var minDistane = 100;

        simulation.force("link")
            .links( this.edges)
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
    }


    inPath(source:any, target:any){

        for(var i=0; i < this.edges_in_path.length; i++){
            var edge = this.edges_in_path[i];

            if(edge.first_node == source && edge.second_node == target || edge.first_node == target && edge.second_node == source  ){

                return true;
            }// pass
        }

        return false;
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

    protected __render(newValue: Graph): void
    {
        if( !newValue )
            return;

        this.build()
    }

    protected ngOnChanges( changes: { [propertyName: string]: SimpleChange } ): void
    {
        this.__render( this.graph );
    }
}