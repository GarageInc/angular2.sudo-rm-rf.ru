import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';
import { HeroesComponent } from './heroes.component';
import { GraphsComponent } from './graphs.component';
import { HeroDetailComponent } from './hero-detail.component';
import { HeroService } from './services/hero.service';
import {GraphService} from "./services/graph.service";

@Component({
  selector: 'my-app',
  templateUrl: './app/views/app.component.html',
  styleUrls: ['/app/assets/css/app.component.css'],
  directives: [
      ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS,
    HeroService,
    GraphService
  ]
})

@RouteConfig([
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
        useAsDefault: true
    },
    {
        path: '/detail/:id',
        name: 'HeroDetail',
        component: HeroDetailComponent
    },
    {
        path: '/heroes',
        name: 'Heroes',
        component: HeroesComponent
    },
    {
        path: '/graphs',
        name: 'Graphs',
        component: GraphsComponent
    }
])

export class AppComponent {
  title = 'Tour of Heroes';
}
