// login.component.ts
import {Component, Input} from 'angular2/core';
import { Router } from 'angular2/router';

import { UserService } from '../../services/user.service';

@Component({
    selector: 'logout',
    templateUrl: 'app/views/user/logout.component.html'
})
export class LogoutComponent {

    constructor(protected userService: UserService, protected router: Router) {
    }

    onLogout() {

        this.userService.logout();
        this.router.navigate(['Dashboard']);
    }
}