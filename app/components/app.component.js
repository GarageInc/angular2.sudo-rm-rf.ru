System.register(['angular2/router', "angular2/core", './dashboard.component', './graphs/mygraphs.component', './graphs/graph-detail.component', './graphs/graph-create.component', "../services/graph.service", "../services/user.service", "../directives/logged-in-router-outlet", './user/login.component', './user/profile.component', "./user/logout.component", "../services/node.service", "../services/edge.service", "./test.component", "./main.component", "./projects/projects.component", "./about/about.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var router_1, core_1, dashboard_component_1, mygraphs_component_1, graph_detail_component_1, graph_create_component_1, graph_service_1, user_service_1, logged_in_router_outlet_1, login_component_1, profile_component_1, logout_component_1, node_service_1, edge_service_1, test_component_1, main_component_1, projects_component_1, about_component_1;
    var AppComponent;
    return {
        setters:[
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (dashboard_component_1_1) {
                dashboard_component_1 = dashboard_component_1_1;
            },
            function (mygraphs_component_1_1) {
                mygraphs_component_1 = mygraphs_component_1_1;
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
            },
            function (logout_component_1_1) {
                logout_component_1 = logout_component_1_1;
            },
            function (node_service_1_1) {
                node_service_1 = node_service_1_1;
            },
            function (edge_service_1_1) {
                edge_service_1 = edge_service_1_1;
            },
            function (test_component_1_1) {
                test_component_1 = test_component_1_1;
            },
            function (main_component_1_1) {
                main_component_1 = main_component_1_1;
            },
            function (projects_component_1_1) {
                projects_component_1 = projects_component_1_1;
            },
            function (about_component_1_1) {
                about_component_1 = about_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = '@GarageInc';
                    this.date = 'blablabla';
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
                            graph_service_1.GraphService,
                            edge_service_1.EdgeService,
                            node_service_1.NodeService
                        ]
                    }),
                    router_1.RouteConfig([
                        {
                            path: '/about',
                            name: 'About',
                            component: about_component_1.AboutComponent,
                            useAsDefault: true
                        },
                        {
                            path: '/main',
                            name: 'Main',
                            component: main_component_1.MainComponent,
                        },
                        {
                            path: '/dashboard',
                            name: 'Dashboard',
                            component: dashboard_component_1.DashboardComponent,
                        },
                        {
                            path: '/graphs/detail/:id',
                            name: 'GraphDetail',
                            component: graph_detail_component_1.GraphDetailComponent
                        },
                        {
                            path: '/mygraphs',
                            name: 'MyGraphs',
                            component: mygraphs_component_1.MyGraphsComponent
                        },
                        {
                            path: '/mygraphs/create',
                            name: 'CreateGraph',
                            component: graph_create_component_1.GraphCreateComponent
                        },
                        {
                            path: '/login',
                            name: 'Login',
                            component: login_component_1.LoginComponent
                        },
                        {
                            path: '/logout',
                            name: 'Logout',
                            component: logout_component_1.LogoutComponent
                        },
                        {
                            path: '/profile',
                            name: 'Profile',
                            component: profile_component_1.ProfileComponent
                        },
                        {
                            path: '/test',
                            name: 'Test',
                            component: test_component_1.TestComponent,
                        },
                        {
                            path: '/projects',
                            name: 'Projects',
                            component: projects_component_1.ProjectsComponent,
                        },
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map