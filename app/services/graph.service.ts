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
  }

  getGraphs (): Promise<Graph[]> {

    var params:{ [ key:string] : string} = {};

    return this.get( BaseService.GATEWAY_GRAPHS+"/index",  this.setAuthParams( params))
        .map( this.extractDataGraphs)
        .catch( this.handleError)
        .toPromise();
  }

  create ( name:string) {

    var params:{ [ key:string] : string} = {};

    params["graphname"]  = name;

    return this.post( BaseService.GATEWAY_GRAPHS+"/create",  this.setAuthParams( params))
        .map(result => result ? true : false);
  }

  save ( graph:Graph) {

    var params:{ [ key:string] : string} = {};

    params["graph_id"]  = graph.id.toString();
    params["graphname"]  = graph.graphname;

    return this.post( BaseService.GATEWAY_GRAPHS+"/save",  this.setAuthParams( params))
        .toPromise();
  }

  getGraphSctructure(id:number):Promise<Graph>{
    var params:{ [ key:string] : string} = {};

    params["graph_id"]  = id.toString();

    return this.get( BaseService.GATEWAY_GRAPHS+"/structure",  this.setAuthParams( params))
        .map( this.extractGraphStructure)
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
