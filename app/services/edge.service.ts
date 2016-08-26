import { Injectable } from 'angular2/core';

import { Graph } from '../models/graphs/graph';

import { Http, Response } from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

import { GRAPHS } from '../mocks/mock-graphs';
import {BaseService} from "./base/base.service";
import {Edge} from "../models/graphs/edge";

@Injectable()
export class EdgeService extends BaseService{

  constructor (protected http: Http) {
    super( http);

    this.GATEWAY = BaseService.GATEWAY_EDGES;
  }

  create (  graph:Graph, weight:number, node_first_id:string, node_second_id:string):Promise<Edge>{

    return this.post( this.GATEWAY + "/create",{
      "graph_id": graph.id,
      "weight": weight.toString(),
      "node_first_id": node_first_id,
      "node_second_id": node_second_id
    }, true)
        .map( this.extractEdgeStructure)
        .toPromise();
  }

  delete (graph:Graph,  id:string) {

    var params:{ [ key:string] : string} = {};

    params["edge_id"] = id;
      params["graph_id"] = graph.id;

    return this.post( this.GATEWAY + "/delete",  {
      "edge_id": id,
      "graph_id": graph.id
    }, true)
        .map(result => result ? true : false)
        .toPromise();
  }

  // UTILS

  protected extractEdgeStructure(res:Response){

    let body = res.json();

    var edge:Edge = new Edge()

    edge.fillFromJSON( body)

    return edge;
  }
}
