System.register(['angular2/core', 'angular2/router', './dashboard.component', './components/graphs/graphs.component', './components/graphs/graph-detail.component', './components/graphs/graph-create.component', "./services/graph.service", "./services/user.service", "./logged-in-router-outlet", './components/user/login.component', './components/user/profile.component'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, dashboard_component_1, graphs_component_1, graph_detail_component_1, graph_create_component_1, graph_service_1, user_service_1, logged_in_router_outlet_1, login_component_1, profile_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (graphs_component_1_1) {
                graphs_component_1 = graphs_component_1_1;
            },
            function (graph_detail_component_1_1) {
                graph_detail_component_1 = graph_detail_component_1_1;
            },
            function (graph_create_component_1_1) {
                graph_create_component_1 = graph_create_component_1_1;
            },
            function (graph_service_1_1) {
                graph_service_1 = graph_service_1_1;
            },
            function (user_service_1_1) {
                user_service_1 = user_service_1_1;
            },
            function (logged_in_router_outlet_1_1) {
                logged_in_router_outlet_1 = logged_in_router_outlet_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (profile_component_1_1) {
                profile_component_1 = profile_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Test App';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/views/app/app.component.html',
                        styleUrls: ['app/assets/css/app.component.css'],
                        directives: [
                            router_1.ROUTER_DIRECTIVES,
                            // ProtectedDirective,
                            logged_in_router_outlet_1.LoggedInRouterOutlet
                        ],
                        providers: [
                            router_1.ROUTER_PROVIDERS,
                            user_service_1.UserService,
                            graph_service_1.GraphService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/detail/:id',
                            name: 'GraphDetail',
                            component: graph_detail_component_1.GraphDetailComponent
                        },
                        {
                            path: '/graphs',
                            name: 'MyGraphs',
                            component: graphs_component_1.GraphsComponent
                        },
                        {
                            path: '/graphs/create',
                            name: 'CreateGraph',
                            component: graph_create_component_1.GraphCreateComponent
                        },
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_component_1.LoginComponent
                        },
                        {
                            path: '/profile',
                            name: 'Profile',
                            component: profile_component_1.ProfileComponent
                        }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map