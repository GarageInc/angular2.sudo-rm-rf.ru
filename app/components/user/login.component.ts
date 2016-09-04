import {Component, Input} from 'angular2/core';
import { Router } from 'angular2/router';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: 'app/views/user/login.component.html'
})
export class LoginComponent {

    constructor(protected userService: UserService, protected router: Router) {
    }

    public username:string;

    public password:string;

    public rememberme:Boolean;

    submitted = false;

    onLogin() {

        this.submitted = true;

        this.userService.login(this.username, this.password, this.rememberme).subscribe((result) => {

            this.submitted = false;

            if ( result) {
                this.router.navigate(['Dashboard']);
            } else {
                alert("Fail to registration: ckeck your name!")
            }
        });
    }
}