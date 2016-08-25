import { Component } from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';

import { DashboardComponent } from './dashboard.component';
import { MyGraphsComponent } from './components/graphs/mygraphs.component';
import { GraphDetailComponent } from './components/graphs/graph-detail.component';
import { GraphCreateComponent } from './components/graphs/graph-create.component';
import {GraphService} from "./services/graph.service";
import {UserService} from "./services/user.service";
//
import { LoggedInRouterOutlet } from "./logged-in-router-outlet";
import { LoginComponent } from './components/user/login.component';
import { ProfileComponent } from './components/user/profile.component';
import {ProtectedDirective} from "./protected-directive";
import {LogoutComponent} from "./components/user/logout.component";
import {NodeService} from "./services/node.service";
import {EdgeService} from "./services/edge.service";

@Component({
  selector: 'my-app',
  templateUrl: 'app/views/app/app.component.html',
  styleUrls: ['app/assets/css/app.component.css'],
  directives: [
      ROUTER_DIRECTIVES,
      // ProtectedDirective,
      LoggedInRouterOutlet
  ],
  providers: [
    ROUTER_PROVIDERS,
    UserService,
    GraphService,
      EdgeService,
      NodeService
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
        path: '/graphs/detail/:id',
        name: 'GraphDetail',
        component: GraphDetailComponent
    },
    {
        path: '/graphs',
        name: 'MyGraphs',
        component: MyGraphsComponent
    },
    {
        path: '/graphs/create',
        name: 'CreateGraph',
        component: GraphCreateComponent
    },
    {
        path: '/login',
        name: 'Login',
        component: LoginComponent
    },
    {
        path: '/logout',
        name: 'Logout',
        component: LogoutComponent
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
