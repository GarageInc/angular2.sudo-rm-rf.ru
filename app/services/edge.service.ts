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
  }

  create (  graph:Graph, weight:number, node_first_id:string, node_second_id:string) {

    var params:{ [ key:string] : string} = {};

    params["graph_id"] = graph.id;
    params["weight"] = weight.toString();
    params["node_first_id"] = node_first_id;
    params["node_second_id"] = node_second_id;

    return this.post( BaseService.GATEWAY_EDGES + "/create",  this.setAuthParams( params))
        .map( this.extractEdgeStructure)
        .toPromise();
  }

  delete (  id:string) {

    var params:{ [ key:string] : string} = {};

    params["edge_id"] = id;

    return this.post( BaseService.GATEWAY_EDGES + "/delete",  this.setAuthParams( params))
        .map(result => result ? true : false)
        .toPromise();
  }

  protected extractEdgeStructure(res:Response){

    let body = res.json();

    var edge:Edge = new Edge()

    edge.fillFromJSON( body)

    return edge;
  }
}
