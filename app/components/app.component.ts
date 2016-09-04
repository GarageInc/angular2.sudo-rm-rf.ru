import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
import {Component, ViewEncapsulation} from "angular2/core";

import { DashboardComponent } from './dashboard.component';
import { MyGraphsComponent } from './graphs/mygraphs.component';
import { GraphDetailComponent } from './graphs/graph-detail.component';
import { GraphCreateComponent } from './graphs/graph-create.component';
import {GraphService} from "../services/graph.service";
import {UserService} from "../services/user.service";
//
import { LoggedInRouterOutlet } from "../directives/logged-in-router-outlet";
import { LoginComponent } from './user/login.component';
import { ProfileComponent } from './user/profile.component';
import {ProtectedDirective} from "../directives/protected-directive";
import {LogoutComponent} from "./user/logout.component";
import {NodeService} from "../services/node.service";
import {EdgeService} from "../services/edge.service";
import {TestComponent} from "./test.component";

import {MainComponent} from "./main.component";
import {ProjectsComponent} from "./projects/projects.component";
import {AboutComponent} from "./about/about.component";

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
        path: '/about',
        name: 'About',
        component: AboutComponent,
        useAsDefault: true
    },
    {
        path: '/main',
        name: 'Main',
        component: MainComponent,
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardComponent,
    },
    {
        path: '/graphs/detail/:id',
        name: 'GraphDetail',
        component: GraphDetailComponent
    },
    {
        path: '/mygraphs',
        name: 'MyGraphs',
        component: MyGraphsComponent
    },
    {
        path: '/mygraphs/create',
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
    ,{
        path: '/test',
        name: 'Test',
        component: TestComponent,
    }
    ,{
        path: '/projects',
        name: 'Projects',
        component: ProjectsComponent,
    },
])

export class AppComponent {
  title = '@GarageInc';
  date = 'blablabla'
}
