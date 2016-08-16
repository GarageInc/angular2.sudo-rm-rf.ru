import { Injectable } from 'angular2/core';

import { Http, Response } from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';


@Injectable()
export class BaseService {

    protected static GATEWAY_GRAPHS:string = "http://127.0.0.1:3000/index.php/graph/index";
    protected static GATEWAY_USER_LOGIN:string = "http://php.sudo-rm-rf.ru/web/index.php/site/login";

    constructor (protected http: Http) {}


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
