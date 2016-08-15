import { Injectable } from 'angular2/core';

import {Http, Response, Headers} from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

import { GRAPHS } from '../mocks/mock-graphs';
import {BaseService} from "./base/base.service";
import {User} from "../models/user";

@Injectable()
export class UserService extends BaseService{
    protected is_logged_in = false;

    constructor (protected http: Http) {
        super( http);

        this.is_logged_in = !!localStorage.getItem('token');
    }

    public login(username:string, password:string, rememberme: Boolean) {
        let headers = new Headers();

        headers.append('Access-Control-Allow-Origin', '*');

        console.log(headers)

        return this.http
            .post(
                BaseService.GATEWAY_USER_LOGIN,
                JSON.stringify({ username, password, rememberme }),
                {
                    headers
                }
            )
            .map(res => res.json())
            .map((res) => {
                if (res.success) {
                    localStorage.setItem('token', res.token);
                    this.is_logged_in = true;
                }

                return res.success;
            });
    }

    public  logout() {
        localStorage.removeItem('token');
        this.is_logged_in = false;
    }

    public isAuthenticated() {
        return this.is_logged_in;
    }

    protected extractData(res: Response) {
        let body = res.json();

        var user = new User();

        user.fillFromJSON( body)

        return user;
    }
}