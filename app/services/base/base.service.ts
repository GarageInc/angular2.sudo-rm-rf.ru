import { Injectable } from 'angular2/core';

import {Http, Response, Headers} from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

interface ParamsMap<T> {
    [K: string]: T;
}

@Injectable()
export class BaseService {

    protected static GATEWAY_GRAPHS:string = "http://127.0.0.1:3000/index.php/graph/index";
    protected static GATEWAY_USER_LOGIN:string = "http://127.0.0.1:3000/index.php/site/login";

    constructor (protected http: Http) {}

    public getHeaders():Headers{
        let headers = new Headers();

        headers.set('Content-Type', 'application/x-www-form-urlencoded');
        headers.set('Accept','text/xml');

        return headers;
    }

    protected post(url:string, params:{ [key: string] : string; }){

        let bodyArray:Array<string> = [];

        for (var key in params) {
            var value = params[key];

            bodyArray.push(key + '=' + encodeURIComponent(value))
        }

        let body:string = bodyArray.join("&");
        let headers = this.getHeaders();

        console.log(body)

        return this.http
            .post(
                url,
                body,
                {
                    headers
                }
            )
    }

    protected extractData(res: Response) {
    }

    protected handleError (error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

        console.error(errMsg); // log to console instead

        return Observable.throw(errMsg);
    }

}
