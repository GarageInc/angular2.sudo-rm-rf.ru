import { Injectable } from 'angular2/core';

import { Graph } from '../models/graph';

import { Http, Response } from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

import { GRAPHS } from '../mocks/mock-graphs';

@Injectable()
export class GraphService {

  constructor (private http: Http) {}

  getGraphs (): Promise<Graph[]> {
    return this.http.get( "http://127.0.0.1:3000/index.php/graph/index" )
        .map(this.extractData)
        .catch(this.handleError)
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

    console.log(graphs)

    return graphs;
  }


  protected handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    console.error(errMsg); // log to console instead

    return Observable.throw(errMsg);
  }

  getGraph(id:number){
    return this.getGraphs().then(
        heroes => heroes.filter(hero => hero.id == id)[0]
    )
  }

}
