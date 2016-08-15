// logged-in-router-outlet.ts
import {
    ElementRef, DynamicComponentLoader, AttributeMetadata, Directive, Attribute
} from 'angular2/core';
import { Router, RouterOutlet, ComponentInstruction } from 'angular2/router';

import { UserService } from './services/user.service';

@Directive({
    selector: 'router-outlet'
})

export class LoggedInRouterOutlet extends RouterOutlet {

    publicRoutes: Array<string>;
    private parentRouter: Router;

    constructor(
        _elementRef: ElementRef, _loader: DynamicComponentLoader,
        _parentRouter: Router, @Attribute('name') nameAttr: string,
        protected userService: UserService
    ) {
        super(_elementRef, _loader, _parentRouter, nameAttr);

        this.parentRouter = _parentRouter;
        this.publicRoutes = ['', 'login', 'signup'];
    }

    activate(instruction: ComponentInstruction) {

        if (this._canActivate( instruction.urlPath)) {
            return super.activate(instruction);
        }

        this.parentRouter.navigate(['Login']);
    }

    _canActivate(url:string) {
        return this.publicRoutes.indexOf(url) !== -1 || this.userService.isAuthenticated();
    }
}