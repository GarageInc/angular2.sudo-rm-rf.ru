import { Injectable } from 'angular2/core';

import { Graph } from '../models/graphs/graph';

import { Http, Response } from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

import { GRAPHS } from '../mocks/mock-graphs';
import {BaseService} from "./base/base.service";

@Injectable()
export class GraphService extends BaseService{

  constructor (protected http: Http) {
    super( http);
    
    this.GATEWAY = BaseService.GATEWAY_GRAPHS;
  }

  getGraphs (): Promise<Graph[]> {

    var params:{ [ key:string] : string} = {};

    return this.get( this.GATEWAY+"/index",  this.setAuthParams( params))
        .map( this.extractDataGraphs)
        .catch( this.handleError)
        .toPromise();
  }

  getMyGraphs (): Promise<Graph[]> {

    var params:{ [ key:string] : string} = {};

    return this.get( this.GATEWAY+"/usergraphs",  this.setAuthParams( params))
        .map( this.extractDataGraphs)
        .catch( this.handleError)
        .toPromise();
  }

  create ( name:string) {

    var params:{ [ key:string] : string} = {};

    params["graphname"]  = name;

    return this.post( this.GATEWAY+"/create",  this.setAuthParams( params))
        .map(result => result ? true : false);
  }

  save ( graph:Graph) {

    var params:{ [ key:string] : string} = {};

    params["graph_id"]  = graph.id.toString();
    params["graphname"]  = graph.graphname;

    return this.post( this.GATEWAY+"/save",  this.setAuthParams( params))
        .toPromise();
  }

  getGraphSctructure(id:string):Promise<Graph>{
    var params:{ [ key:string] : string} = {};

    params["graph_id"]  = id;

    return this.get( this.GATEWAY+"/structure",  this.setAuthParams( params))
        .map( this.extractGraphStructure)
        .toPromise();
  }

  findPath(graph:Graph,node_first_id:string, node_second_id:string){

    var params:{ [ key:string] : string} = {};

    params["graph_id"]  = graph.id;
    params["node_first_id"]  = node_first_id;
    params["node_second_id"]  = node_second_id;
    
    return this.post( this.GATEWAY+"/findpath", this.setAuthParams(params))
        .map(function(res:Response){
          return res.json();
        })
        .toPromise();
  }
  
  protected extractDataGraphs(res: Response) {
    let body = res.json();

    var graphs:Graph[] = [];

    for (let entry of body) {
      var graph = new Graph();

      graph.fillFromJSON( entry)

      graphs.push( graph)
    }

    return graphs;
  }

  protected extractGraphStructure(res:Response){
    let body = res.json();

    var graph = new Graph()

    graph.graphname = body.graphname;
    graph.id = body.id;

    graph.fillNodes( body.nodes)
    graph.fillEdges( body.edges)

    return graph;
  }

}
