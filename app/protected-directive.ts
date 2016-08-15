import {Directive, OnDestroy} from 'angular2/core';
import {UserService} from './services/user.service';
import {ROUTER_DIRECTIVES, Router, Location} from "angular2/router";

@Directive({
    selector: '[protected]'
})

export class ProtectedDirective implements OnDestroy {
    private sub:any = null;

    constructor(private userService:UserService, private router:Router, private location:Location) {
        if ( !userService.isAuthenticated()) {
            this.location.replaceState('/'); // clears browser history so they can't navigate with back button
            this.router.navigate(['PublicPage']);
        }
        //
        // this.sub = this.userService.subscribe((val) => {
        //     if ( !val.authenticated) {
        //         this.location.replaceState('/'); // clears browser history so they can't navigate with back button
        //         this.router.navigate(['LoggedoutPage']); // tells them they've been logged out (somehow)
        //     }
        // });
    }

    ngOnDestroy() {
        if (this.sub != null) {
            this.sub.unsubscribe();
        }
    }
}