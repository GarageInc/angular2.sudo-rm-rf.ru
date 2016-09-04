System.register(['angular2/core', "../tabs/tabs.component"], function(exports_1) {
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
    var core_1, tabs_component_1;
    var ProjectsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (tabs_component_1_1) {
                tabs_component_1 = tabs_component_1_1;
            }],
        execute: function() {
            ProjectsComponent = (function () {
                function ProjectsComponent() {
                }
                ProjectsComponent.prototype.ngOnInit = function () {
                };
                ProjectsComponent = __decorate([
                    core_1.Component({
                        selector: 'my-projects',
                        templateUrl: 'app/views/projects/projects.component.html',
                        styleUrls: ['app/assets/css/projects.component.css'],
                        directives: [tabs_component_1.Tabs]
                    }), 
                    __metadata('design:paramtypes', [])
                ], ProjectsComponent);
                return ProjectsComponent;
            })();
            exports_1("ProjectsComponent", ProjectsComponent);
        }
    }
});
//# sourceMappingURL=projects.component.js.map