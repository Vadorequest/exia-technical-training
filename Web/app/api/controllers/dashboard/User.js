///<reference path='./../../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controller = require('./Dashboard');

/**
* Package that contains all Controllers.
*/
(function (Controllers) {
    var User = (function (_super) {
        __extends(User, _super);
        function User() {
            _super.apply(this, arguments);
        }
        /**
        **************************************************************************************************
        **************************************** Override default methods ********************************
        **************************************************************************************************
        */
        /**
        * Override the super method to bind data by default to avoid to have to do it in every method.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Callback.
        * @param options   Options that contains data used by the parent controller and will be injected in the view.
        */
        User.super = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            options.Controller = User; // Bind the controller to use in every single request.
            controller.Controllers.Dashboard.super(req, res, callback, options);
        };

        /**
        * Returns an object that contains all exported methods for the targeted child.
        * @param child     The child controller class. (not an instance)
        * @returns {*}
        */
        User.exports = function (child) {
            if (typeof child === "undefined") { child = User; }
            // Export child methods if exist.
            return controller.Controllers.Dashboard.exports(child);
        };

        /**
        * User account, where he can update his personal information.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.create = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Create user';

                User.renderView(req, res, options);
            });
        };

        /**
        * Edit the authenticated user.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.edit = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Edit user';

                User.renderView(req, res, options);
            });
        };

        /**
        * List users.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.index = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Users';

                User.renderView(req, res, options);
            });
        };

        /**
        * Show the user profile.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.show = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Show user';

                User.renderView(req, res, options);
            });
        };
        User.exportedMethods = [];
        return User;
    })(controller.Controllers.Dashboard);
    Controllers.User = User;
})(exports.Controllers || (exports.Controllers = {}));
var Controllers = exports.Controllers;
//# sourceMappingURL=User.js.map
