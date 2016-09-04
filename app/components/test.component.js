System.register(['angular2/core', "../models/tabs/DataTab", "./tabs/tabs.component"], function(exports_1) {
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
            })();
            exports_1("TestComponent", TestComponent);
        }
    }
});
//# sourceMappingURL=test.component.js.map