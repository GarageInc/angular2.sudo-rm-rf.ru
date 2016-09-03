System.register([], function(exports_1) {
    var Synchronizable;
    return {
        setters:[],
        execute: function() {
            Synchronizable = (function () {
                function Synchronizable() {
                }
                Synchronizable.prototype.fillFromJSON = function (jsonObj) {
                    for (var propName in jsonObj) {
                        if (typeof this[propName] !== 'object') {
                            this[propName] = jsonObj[propName];
                        }
                    }
                };
                return Synchronizable;
            })();
            exports_1("Synchronizable", Synchronizable);
        }
    }
});
//# sourceMappingURL=Synchronizable.js.map