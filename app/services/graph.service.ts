import { Injectable } from 'angular2/core';

import { Graph } from '../models/graph';

import { Http, Response } from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class GraphService {

  constructor (private http: Http) {}

  getGraphs (): Promise<Graph[]> {
    return this.http.get( "http://localhost:3000/graph/index" )
        .map(this.extractData)
        .catch(this.handleError)
        .toPromise();
  }


  private extractData(res: Response) {
    let body = res.json();

      console.log(body)
    return body.data || { };
  }


  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }


}
