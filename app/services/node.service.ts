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

  create (  graph:Graph, name:string):Promise<Node> {

    return this.post( this.GATEWAY + "/create", {
      "nodename": name,
      "graph_id": graph.id
    }, true)
        .map(this.extractNodeStructure)
        .toPromise();
  }

  delete ( graph:Graph, id:string):Promise<Boolean> {

    return this.post( this.GATEWAY + "/delete", {
      "node_id": id,
      "graph_id": graph.id
    }, true)
        .map(result => result ? true : false)
        .toPromise();
  }

  // UTILS

  protected extractNodeStructure(res:Response){
    let body = res.json();

    var node:Node = new Node()

    node.fillFromJSON( body)

    return node;
  }

}
