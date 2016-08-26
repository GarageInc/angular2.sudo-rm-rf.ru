import { Injectable } from 'angular2/core';

import {Http, Response, Headers} from 'angular2/http';

import { Observable }     from 'rxjs/Observable';

import 'rxjs/Rx';

import { GRAPHS } from '../mocks/mock-graphs';
import {BaseService} from "./base/base.service";
import {User} from "../models/user";
import {UserState} from "../models/states/user.state";
import {BaseException} from "../../node_modules/angular2/src/facade/exceptions";

@Injectable()
export class UserService extends BaseService{

    constructor (protected http: Http) {
        super( http);

        this.GATEWAY = BaseService.GATEWAY_USER_LOGIN;
    }

    public login(username:string, password:string, rememberMe: Boolean){
        rememberMe = !!rememberMe

        return this.post(
            this.GATEWAY
            ,{
                "password": password,
                "username": username,
                "rememberMe": rememberMe.toString()
            }
            ,true
            )
            .map(res => res.json())
            .map((res) => {

                if (res.id && res.pub_token) {

                    UserState.activeUser.id = res.id;
                    UserState.activeUser.pub_token = res.pub_token;

                    return true;
                } else {

                    return false;
                }
            });
    }

    public  logout() {
        UserState.reset();
    }

    public isAuthenticated() {
        return !!UserState.activeUser.pub_token;
    }

    protected extractData(res: Response) {
        let body = res.json();

        var user = new User();

        user.fillFromJSON( body)

        return user;
    }
}