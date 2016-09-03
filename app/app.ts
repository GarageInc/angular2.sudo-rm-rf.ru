import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './app.component';
import {enableProdMode} from "angular2/core";

import {ROUTER_PROVIDERS} from 'angular2/router';
import {
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';

import { HTTP_PROVIDERS } from 'angular2/http';

bootstrap(AppComponent,[
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
]);