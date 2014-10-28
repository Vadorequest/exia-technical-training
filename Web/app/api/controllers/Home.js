///<reference path='./../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var controller = require('./Controller');

/**
* Package that contains all Controllers.
*/
(function (Controllers) {
    var Home = (function (_super) {
        __extends(Home, _super);
        function Home() {
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
        Home.super = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            options.Controller = Home; // Bind the controller to use in every single request.
            controller.Controllers.Controller.super(req, res, callback, options);
        };

        /**
        * Returns an object that contains all exported methods for the targeted child.
        * @param child     The child controller class. (not an instance)
        * @returns {*}
        */
        Home.exports = function (child) {
            if (typeof child === "undefined") { child = Home; }
            // Export child methods if exist.
            return controller.Controllers.Controller.exports(child);
        };

        /**
        * Index page. Main page.
        * @param req       Request.
        * @param res       Response.
        */
        Home.index = function (req, res) {
            Home.super(req, res, function (req, res, options) {
                options.title = 'Parallax scrolling demo';
                options.game = {
                    width: 800,
                    height: 600
                };

                Home.renderView(req, res, options);
            });
        };
        Home.exportedMethods = [];
        return Home;
    })(controller.Controllers.Controller);
    Controllers.Home = Home;
})(exports.Controllers || (exports.Controllers = {}));
var Controllers = exports.Controllers;
//# sourceMappingURL=Home.js.map
