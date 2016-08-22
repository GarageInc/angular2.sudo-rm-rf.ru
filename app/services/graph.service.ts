import { Injectable } from 'angular2/core';

import { Graph } from '../models/graph';

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

    return this.get( BaseService.GATEWAY_GRAPHS,  this.setAuthParams( params))
        .map( this.extractData)
        .catch( this.handleError)
        .toPromise();
  }

  protected extractData(res: Response) {
    let body = res.json();

    var graphs:Graph[] = [];

    for (let entry of body) {
      var graph = new Graph();

      graph.fillFromJSON( entry)

      graphs.push( graph)
    }

    // console.log(graphs)

    return graphs;
  }

  getGraph(id:number){
    return this.getGraphs().then(
        graphs => graphs.filter(graph => graph.id == id)[0]
    )
  }

}
