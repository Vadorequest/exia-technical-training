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
    var Category = (function (_super) {
        __extends(Category, _super);
        function Category() {
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
        Category.super = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            options.Controller = Category; // Bind the controller to use in every single request.
            controller.Controllers.Dashboard.super(req, res, callback, options);
        };

        /**
        * Returns an object that contains all exported methods for the targeted child.
        * @param child     The child controller class. (not an instance)
        * @returns {*}
        */
        Category.exports = function (child) {
            if (typeof child === "undefined") { child = Category; }
            // Export child methods if exist.
            return controller.Controllers.Dashboard.exports(child);
        };

        /**
        * Category account, where he can update his personal information.
        *
        * @param req       Request.
        * @param res       Response.
        */
        Category.create = function (req, res) {
            Category.super(req, res, function (req, res, options) {
                options.title = 'Create category';

                Category.renderView(req, res, options);
            });
        };

        /**
        * Edit the authenticated category.
        *
        * @param req       Request.
        * @param res       Response.
        */
        Category.edit = function (req, res) {
            Category.super(req, res, function (req, res, options) {
                options.title = 'Edit category';

                Category.renderView(req, res, options);
            });
        };

        /**
        * List accesses.
        *
        * @param req       Request.
        * @param res       Response.
        */
        Category.index = function (req, res) {
            Category.super(req, res, function (req, res, options) {
                options.title = 'Users';

                Category.renderView(req, res, options);
            });
        };

        /**
        * Show the category profile.
        *
        * @param req       Request.
        * @param res       Response.
        */
        Category.show = function (req, res) {
            Category.super(req, res, function (req, res, options) {
                options.title = 'Show category';

                Category.renderView(req, res, options);
            });
        };

        /**
        * Create a new category.
        *
        * @param req       Request.
        * @param res       Response.
        */
        Category.new = function (req, res) {
            Category.super(req, res, function (req, res, options) {
                __validator.check([
                    __validator.rulesName(req.param('name'), 'category')
                ], function (errors, keysModelChecked, keysChecked) {
                    // Calculate the code dynamically.
                    keysModelChecked.code = applicationHelper.incrementCode();

                    var Category = __Dao.getModel('category');
                    var category = new Category(keysModelChecked);

                    category.save(function (err, data) {
                        if (err) {
                            Category.errorHandler(err, traceback(), function (err) {
                                res.json(__format.response(err));
                            });
                        } else {
                            res.json(__format.response(new __message(new __messageLang('__46', { category: data.name, code: data.code }), data, true)));
                        }
                    });
                }, res);
            });
        };
        Category.exportedMethods = [];
        return Category;
    })(controller.Controllers.Dashboard);
    Controllers.Category = Category;
})(exports.Controllers || (exports.Controllers = {}));
var Controllers = exports.Controllers;
//# sourceMappingURL=Category.js.map
