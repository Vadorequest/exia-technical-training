///<reference path='./../../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controller = require('./../Controller');

/**
* Package that contains all Controllers.
*/
(function (Controllers) {
    /**
    * This controller is a namespace (NS) controller.
    * It is inherited by all controllers in the same folder. It is possible to set properties that will be applied to all controllers inheriting this NS controller.
    */
    var Dashboard = (function (_super) {
        __extends(Dashboard, _super);
        function Dashboard() {
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
        Dashboard.super = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            // Do not override the controller to use in the child!
            if (!options.Controller) {
                options.Controller = Dashboard; // Bind the controller to use in every single request but only if undefined.
            }

            controller.Controllers.Controller.super(req, res, callback, options);
        };

        /**
        * Returns an object that contains all exported methods for the targeted child.
        * @param child     The child controller class. (not an instance)
        * @returns {*}
        */
        Dashboard.exports = function (child) {
            if (typeof child === "undefined") { child = Dashboard; }
            // Export child methods if exist.
            return controller.Controllers.Controller.exports(child);
        };

        /**
        * List accesses.
        *
        * @param req       Request.
        * @param res       Response.
        */
        Dashboard.index = function (req, res) {
            Dashboard.super(req, res, function (req, res, options) {
                options.title = 'Administration';

                Dashboard.renderView(req, res, options);
            });
        };
        Dashboard.layout = 'dashboard';

        Dashboard.layoutRelativePath = '../../_layouts/';

        Dashboard.exportedMethods = [];
        return Dashboard;
    })(controller.Controllers.Controller);
    Controllers.Dashboard = Dashboard;
})(exports.Controllers || (exports.Controllers = {}));
var Controllers = exports.Controllers;
//# sourceMappingURL=Dashboard.js.map
