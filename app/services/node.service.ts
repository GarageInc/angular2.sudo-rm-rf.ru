import { Injectable } from 'angular2/core';

import { Graph } from '../models/graphs/graph';
import { Node } from '../models/graphs/node';

import { Http, Response } from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

import { GRAPHS } from '../mocks/mock-graphs';
import {BaseService} from "./base/base.service";

@Injectable()
export class NodeService extends BaseService{


  constructor (protected http: Http) {
    super( http);

    this.GATEWAY = BaseService.GATEWAY_NODES;
  }

  create (  graph:Graph, name:string) {

    var params:{ [ key:string] : string} = {};

    params["nodename"] = name;
    params["graph_id"] = graph.id;

    return this.post( this.GATEWAY + "/create",  this.setAuthParams( params))
        .map(this.extractNodeStructure)
        .toPromise();
  }

  delete (  id:string) {

    var params:{ [ key:string] : string} = {};

    params["node_id"] = id;

    return this.post( this.GATEWAY + "/delete",  this.setAuthParams( params))
        .map(result => result ? true : false)
        .toPromise();
  }

  protected extractNodeStructure(res:Response){
    let body = res.json();

    var node:Node = new Node()

    node.fillFromJSON( body)

    return node;
  }

}
