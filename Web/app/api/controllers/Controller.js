///<reference path='./../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controller = require('./../../shared/app/core/controllers/CoreController');
var Controllers;
(function (Controllers) {
    /**
     * Our own and custom implementation of the core controller.
     */
    var Controller = (function (_super) {
        __extends(Controller, _super);
        function Controller() {
            _super.apply(this, arguments);
        }
        /**
         * Default view renderer, manages basic data and stuff to always bind into the views.
         * @param req           Request.
         * @param res           Response.
         * @param options   Specific options to render the view.
         * @param view          View to load. Use the path controller/method by default.
         */
        Controller.renderView = function (req, res, options, view) {
            if (options === void 0) { options = {}; }
            if (view === void 0) { view = false; }
            // Call super.
            controller.CoreControllers.Controller.renderView(req, res, options, view);
        };
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
        Controller.super = function (req, res, callback, options) {
            if (options === void 0) { options = {}; }
            controller.CoreControllers.Controller.super(req, res, callback, options);
        };
        return Controller;
    })(controller.CoreControllers.Controller);
    Controllers.Controller = Controller;
})(Controllers = exports.Controllers || (exports.Controllers = {}));
//# sourceMappingURL=Controller.js.map