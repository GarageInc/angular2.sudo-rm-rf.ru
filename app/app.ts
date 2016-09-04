import { bootstrap }    from 'angular2/platform/browser';
import { AppComponent } from './components/app.component';
import {enableProdMode} from "angular2/core";

import {
    ROUTER_PROVIDERS,
    LocationStrategy,
    HashLocationStrategy
} from 'angular2/router';

import { HTTP_PROVIDERS } from 'angular2/http';

bootstrap(AppComponent,[
    HTTP_PROVIDERS
]);