import {Synchronizable} from "./base/Synchronizable";

export class User extends Synchronizable {

    reset(){
        localStorage.clear()
    }

    get pub_token():string {
        return localStorage.getItem("pub_token");
    }
    set pub_token(pub_token:string) {
        localStorage.setItem("pub_token", pub_token);
    }

    get pub_secret():string {
        return localStorage.getItem("pub_secret");
    }
    set pub_secret(pub_secret:string) {
        localStorage.setItem("pub_secret", pub_secret);
    }

    get id():string {

        return localStorage.getItem("id");
    }
    set id(id:string) {
        localStorage.setItem("id", id);
    }

}
