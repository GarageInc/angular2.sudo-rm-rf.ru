// login.component.ts
import {Component, Input} from 'angular2/core';
import { Router } from 'angular2/router';

import { UserService } from './../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: 'app/views/user/login.component.html'
})
export class LoginComponent {

    constructor(protected userService: UserService, protected router: Router) {
    }

    @Input() username:string;

    @Input() password:string;

    @Input() rememberme:Boolean;

    onLogin() {

        this.userService.login(this.username, this.password, this.rememberme).subscribe((result) => {
            if (result) {
                this.router.navigate(['Dashboard']);
            } else {
                alert("Не удалось авторизоваться")
            }
        });
    }
}