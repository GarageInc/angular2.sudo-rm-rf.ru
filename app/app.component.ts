import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';
import { GraphsComponent } from './components/graphs/graphs.component';
import { GraphDetailComponent } from './components/graphs/graph-detail.component';
import {GraphService} from "./services/graph.service";
import {UserService} from "./services/user.service";
//
import { LoggedInRouterOutlet } from "./logged-in-router-outlet";
import { LoginComponent } from './components/user/login.component';
import { ProfileComponent } from './components/user/profile.component';
import {ProtectedDirective} from "./protected-directive";

@Component({
  selector: 'my-app',
  templateUrl: 'app/views/app/app.component.html',
  styleUrls: ['app/assets/css/app.component.css'],
  directives: [
      ROUTER_DIRECTIVES,
      ProtectedDirective,
      // LoggedInRouterOutlet
  ],
  providers: [
    ROUTER_PROVIDERS,
    UserService,
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
        name: 'Login',
       component: LoginComponent
    },
    {
       path: '/profile',
        name: 'Profile',
       component: ProfileComponent
    }
])

export class AppComponent {
  title = 'Test App';
}
