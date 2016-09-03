System.register(['angular2/core', "../models/tabs/DataTab", "angular2/src/facade/async"], function(exports_1, context_1) {
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
    var core_1, DataTab_1, async_1;
    var Tabs;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (DataTab_1_1) {
                DataTab_1 = DataTab_1_1;
            },
            function (async_1_1) {
                async_1 = async_1_1;
            }],
        execute: function() {
            Tabs = (function () {
                function Tabs() {
                    this.updateTab = new async_1.EventEmitter();
                    this.selected_tab = new DataTab_1.DataTab();
                }
                Tabs.prototype.setSelected = function (value) {
                    this.selected_tab = value;
                    this.updateTab.next(value);
                };
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', async_1.EventEmitter)
                ], Tabs.prototype, "updateTab", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], Tabs.prototype, "tabs", void 0);
                Tabs = __decorate([
                    core_1.Component({
                        selector: 'tabs',
                        templateUrl: 'app/views/tabs.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Tabs);
                return Tabs;
            }());
            exports_1("Tabs", Tabs);
        }
    }
});
//# sourceMappingURL=tabs.component.js.map