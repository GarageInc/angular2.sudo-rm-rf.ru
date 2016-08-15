import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { GraphDetailComponent } from './components/graphs/graph-detail.component';
import {GraphService} from "./services/graph.service";

import { LoginComponent } from './components/identity/login.component';
import { ProfileComponent } from './components/identity/profile.component';

@Component({
  selector: 'my-app',
  templateUrl: 'app/views/app/app.component.html',
  styleUrls: ['app/assets/css/app.component.css'],
  directives: [
      ROUTER_DIRECTIVES
  ],
  providers: [
    ROUTER_PROVIDERS,
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
        name: 'GraphDetail',
        component: GraphDetailComponent
    },
    {
        path: '/graphs',
        name: 'Graphs',
        component: GraphsComponent
    },

    {
        path: '/login',
        component: LoginComponent,
        name: 'Login' },
    {
        path: '/profile',
        component: ProfileComponent,
        name: 'Profile'
    }
])

export class AppComponent {
  title = 'Test App';
}
