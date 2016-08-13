import { Injectable } from 'angular2/core';

import { Hero } from '../models/hero';
import { HEROES } from '../mocks/mock-heroes';

import { Http, Response } from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

@Injectable()
export class HeroService {

  constructor (private http: Http) {}

  getHeroes (): Promise<Hero[]> {
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

  getHeroesSlowly() {
    return new Promise<Hero[]>(resolve =>
      setTimeout(()=>resolve(HEROES), 2000) // 2 seconds
    );
  }

  getHero(id: number) {
    return Promise.resolve(HEROES).then(
      heroes => heroes.filter(hero => hero.id === id)[0]
    );
  }
}
