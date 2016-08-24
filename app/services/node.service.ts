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
  }

  create (  graph:Graph, name:string) {

    var params:{ [ key:string] : string} = {};

    params["nodename"] = name;
    params["graph_id"] = graph.id;

    return this.post( BaseService.GATEWAY_NODES + "/create",  this.setAuthParams( params))
        .map(this.extractNodeStructure)
        .toPromise();
  }

  protected extractNodeStructure(res:Response){
    let body = res.json();

    var node:Node = new Node()

    node.fillFromJSON( body)

    return node;
  }

}
