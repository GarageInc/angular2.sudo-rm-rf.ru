import {Synchronizable} from "../base/Synchronizable";
import {Edge} from "./edge";
import {Node} from "./node";

export class Graph extends Synchronizable {
  id: string;
  graphname: string;

  nodes: Array<Node> = [];
  edges: Array<Edge> = [];

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
}
