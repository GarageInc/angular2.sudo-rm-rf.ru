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

    return this.get( this.GATEWAY+"/index",  {}, false)
        .map( this.extractDataGraphs)
        .catch( this.handleError)
        .toPromise();
  }

  getMyGraphs (): Promise<Graph[]> {

    return this.get( this.GATEWAY+"/usergraphs",  {}, true)
        .map( this.extractDataGraphs)
        .catch( this.handleError)
        .toPromise();
  }

  create ( name:string):Promise<Boolean> {

    return this.post( this.GATEWAY+"/create", {
      "graphname": name
    }, true)
        .map(result => result ? true : false)
        .toPromise();
  }

  save ( graph:Graph):Promise<Boolean> {

    return this.post( this.GATEWAY+"/save", {
      "graph_id": graph.id,
      "graphname": graph.graphname
    }, true)
        .map(result => result ? true : false)
        .toPromise();
  }

  structure( id:string):Promise<Graph>{

    return this.get( this.GATEWAY+"/structure", {
      "graph_id": id
    }  , false)
        .map( this.extractGraphStructure)
        .toPromise();
  }

  findpath(graph:Graph,node_first_id:string, node_second_id:string){

    return this.post( this.GATEWAY+"/findpath",{
      "graph_id": graph.id,
      "node_first_id": node_first_id,
      "node_second_id": node_second_id
    }, false)
        .map(function(res:Response){
          return res.json();
        })
        .toPromise();
  }

  // UTILS

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

    graph.fillStructure( body)

    return graph;
  }

}
