import { Injectable } from 'angular2/core';

import {Http, Response, Headers} from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

import { GRAPHS } from '../mocks/mock-graphs';
import {BaseService} from "./base/base.service";
import {User} from "../models/user";
import {BaseException} from "../../node_modules/angular2/src/facade/exceptions";

@Injectable()
export class UserService extends BaseService{
    protected is_logged_in = false;

    constructor (protected http: Http) {
        super( http);

        this.is_logged_in = !!localStorage.getItem('token');
    }

    public login(username:string, password:string, rememberMe: Boolean) {
        rememberMe = !!rememberMe

        let params:{ [key: string]: any; } = {};

        params["password"] = password;
        params["username"] = username;
        params["rememberMe"] = rememberMe;

        return this.post(
                BaseService.GATEWAY_USER_LOGIN,
                params
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


    getTitle(text:string) {
        return text.match('<title>(.*)?</title>')[1];
    }

    makeCorsRequest(body:string) {
        // bibliographica.org supports CORS.
        var url = BaseService.GATEWAY_USER_LOGIN;

        var xhr = new XMLHttpRequest();

        //
        //xhr.withCredentials = true;

        if ("withCredentials" in xhr) {
            // XHR for Chrome/Safari/Firefox.
            xhr.open("POST", url, true);
        } else {
            // CORS not supported.
            xhr = null;
        }

        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function() {
            var text = xhr.responseText;
            var title = this.getTitle(text);
            alert('Response from CORS request to ' + url + ': ' + title);
        };

        xhr.onerror = function() {
            alert('Woops, there was an error making the request.');
        };

        xhr.send(body);
    }
}