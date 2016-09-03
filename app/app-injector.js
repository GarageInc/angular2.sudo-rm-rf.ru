System.register([], function(exports_1) {
    var appInjectorRef, appInjector;
    return {
        setters:[],
        execute: function() {
            exports_1("appInjector", appInjector = function (injector) {
                if (injector) {
                    appInjectorRef = injector;
                }
                return appInjectorRef;
            });
        }
    }
});
//# sourceMappingURL=app-injector.js.map