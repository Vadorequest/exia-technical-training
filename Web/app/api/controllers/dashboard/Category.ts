///<reference path='./../../lib/def/defLoader.d.ts'/>

import controller = require('./Dashboard');

/**
 * Package that contains all Controllers.
 */
export module Controllers {

    export class Category extends controller.Controllers.Dashboard {

        /**
         * Exported methods, accessible from internet.
         */
        public static exportedMethods: any = [
        ];

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
        public static super(req, res, callback, options: any = {}){
            options.Controller = Category;// Bind the controller to use in every single request.
            controller.Controllers.Dashboard.super(req, res, callback, options);
        }

        /**
         * Returns an object that contains all exported methods for the targeted child.
         * @param child     The child controller class. (not an instance)
         * @returns {*}
         */
        public static exports(child: any = Category): any{
            // Export child methods if exist.
            return controller.Controllers.Dashboard.exports(child);
        }

        /**
         * Category account, where he can update his personal information.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static create(req, res){
            Category.super(req, res, function(req, res, options){
                options.title = 'Create category';

                Category.renderView(req, res, options);
            });
        }

        /**
         * Edit the authenticated category.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static edit(req, res){
            Category.super(req, res, function(req, res, options){
                options.title = 'Edit category';

                Category.renderView(req, res, options);
            });
        }

        /**
         * List accesses.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static index(req, res){
            Category.super(req, res, function(req, res, options){
                options.title = 'Users';

                Category.renderView(req, res, options);
            });
        }

        /**
         * Show the category profile.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static show(req, res){
            Category.super(req, res, function(req, res, options){
                options.title = 'Show category';

                Category.renderView(req, res, options);
            });
        }

        /**
         * Create a new category.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static new(req, res){
            Category.super(req, res, function(req, res, options){
                __validator.check([
                    __validator.rulesName(req.param('name'), 'category')
                ], function(errors, keysModelChecked, keysChecked){

                    // Calculate the code dynamically.
                    keysModelChecked.code = applicationHelper.incrementCode();

                    var Category = __Dao.getModel('category');
                    var category = new Category(keysModelChecked);

                    category.save(function(err, data) {
                        if(err){
                            Category.errorHandler(err, traceback(), function(err){
                                res.json(__format.response(err));
                            });
                        }else{
                            res.json(__format.response(new __message(new __messageLang('__46', {category: data.name, code: data.code}), data, true)));
                        }
                    });
                }, res);
            });
        }

        /**
         **************************************************************************************************
         **************************************** Add custom methods **************************************
         **************************************************************************************************
         */

    }
}