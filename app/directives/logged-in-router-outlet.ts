import {
    ElementRef, DynamicComponentLoader, AttributeMetadata, Directive, Attribute
} from 'angular2/core';
import { Router, RouterOutlet, ComponentInstruction } from 'angular2/router';

import { UserService } from '../services/user.service';

@Directive({
    selector: 'logged-in-router-outlet'
})

export class LoggedInRouterOutlet extends RouterOutlet {

    protected routeNames: Array<string>;
    protected parentRouter: Router;

    constructor(
        _elementRef: ElementRef,
        _loader: DynamicComponentLoader,
        _parentRouter: Router,
        @Attribute('name') nameAttr: string,
        protected userService: UserService
    ) {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.routeNames = ['', 'Login', 'Dashboard','GraphDetail'];
    }

    activate(instruction: ComponentInstruction) {

        console.log(instruction)
        if (this._canActivate( instruction.routeName)) {
            return super.activate(instruction);
        }

        this.parentRouter.navigate(['Login']);
    }

    _canActivate(routeName:string) {
        // console.log(url)
        // console.log(this.publicRoutes.indexOf(url))
        return this.routeNames.indexOf(routeName) !== -1 || this.userService.isAuthenticated();
    }
}