System.register(['angular2/core', "../../models/tabs/DataTab", "angular2/src/facade/async"], function(exports_1) {
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
                ], Tabs.prototype, "updateTab");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Array)
                ], Tabs.prototype, "tabs");
                Tabs = __decorate([
                    core_1.Component({
                        selector: 'tabs',
                        templateUrl: 'app/views/tabs/tabs.component.html'
                    }), 
                    __metadata('design:paramtypes', [])
                ], Tabs);
                return Tabs;
            })();
            exports_1("Tabs", Tabs);
        }
    }
});
//# sourceMappingURL=tabs.component.js.map