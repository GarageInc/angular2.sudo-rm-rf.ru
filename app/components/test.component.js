System.register(['angular2/core', "../models/tabs/DataTab", "./tabs.component"], function(exports_1, context_1) {
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
    var core_1, DataTab_1, tabs_component_1;
    var TestComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (DataTab_1_1) {
                DataTab_1 = DataTab_1_1;
            },
            function (tabs_component_1_1) {
                tabs_component_1 = tabs_component_1_1;
            }],
        execute: function() {
            TestComponent = (function () {
                function TestComponent() {
                    this.range = [];
                }
                TestComponent.prototype.ngOnInit = function () {
                    for (var i = 0; i < 5; i++) {
                        var tab = new DataTab_1.DataTab();
                        tab.id = i;
                        tab.title = "title #" + i.toString();
                        tab.model = "model #" + i.toString();
                        this.range.push(tab);
                    }
                };
                TestComponent.prototype.onUpdate = function (value) {
                    console.log(value);
                };
                TestComponent = __decorate([
                    core_1.Component({
                        selector: 'my-test',
                        templateUrl: 'app/views/test.component.html',
                        styleUrls: ['app/assets/css/test.component.css'],
                        directives: [tabs_component_1.Tabs]
                    }), 
                    __metadata('design:paramtypes', [])
                ], TestComponent);
                return TestComponent;
            }());
            exports_1("TestComponent", TestComponent);
        }
    }
});
//# sourceMappingURL=test.component.js.map