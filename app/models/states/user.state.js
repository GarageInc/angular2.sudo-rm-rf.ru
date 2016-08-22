System.register(["../user"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var user_1;
    var UserState;
    return {
        setters:[
            function (user_1_1) {
                user_1 = user_1_1;
            }],
        execute: function() {
            UserState = (function () {
                function UserState() {
                }
                UserState.reset = function () {
                    this.activeUser = new user_1.User();
                };
                ;
                UserState.activeUser = new user_1.User();
                return UserState;
            }());
            exports_1("UserState", UserState);
        }
    }
});
//# sourceMappingURL=user.state.js.map