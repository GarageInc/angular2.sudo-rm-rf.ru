import {Synchronizable} from "../base/Synchronizable";
import {Edge} from "./edge";
import {Node} from "./node";

export class Graph extends Synchronizable {
  id: string;
  graphname: string;
  user_id: string;

  nodes: Array<Node> = [];
  edges: Array<Edge> = [];


  fillStructure(body:any){

    this.fillFromJSON(body);

    this.fillNodes( body.nodes)
    this.fillEdges( body.edges)

  }

  fillNodes( json_nodes:any){
    this.nodes = [];

    for (let entry of json_nodes) {

      var node:Node = new Node();

      node.fillFromJSON( entry)

      this.nodes.push(node)
    }
  }

  fillEdges( json_edges:any){
    this.edges = [];

    for (let entry of json_edges) {

      var edge:Edge = new Edge();

      edge.fillFromJSON( entry)

      this.edges.push(edge)
    }
  }

  deleteNodeById( node_id:string) {

    var edges_ids:Array<string> = [];

    for( let i=0; i<this.edges.length; i++){
      if( this.edges[i].node_first_id == node_id || this.edges[i].node_second_id == node_id){
        edges_ids.push(this.edges[i].id)
      }
    }

    for( let id of edges_ids){
      this.deleteEdgeById( id);
    }

    var index = -1;

    for(let i=0; i<this.nodes.length; i++){

      if( this.nodes[i].id == node_id){

        index = i;
        break;
      }
    }

    if (index > -1) {
      this.nodes.splice(index, 1);
    }
  }

  deleteEdgeById(edge_id:string){

    var index = -1;

    for(let i=0; i<this.edges.length; i++){

      if( this.edges[i].id == edge_id){

        index = i;
        break;
      }
    }

    if (index > -1) {
      this.edges.splice(index, 1);
    }
  }
}
