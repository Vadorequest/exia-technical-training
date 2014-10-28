///<reference path='./../../lib/def/defLoader.d.ts'/>

import controller = require('./Dashboard');

/**
 * Package that contains all Controllers.
 */
export module Controllers {

    export class User extends controller.Controllers.Dashboard {

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
            options.Controller = User;// Bind the controller to use in every single request.
            controller.Controllers.Dashboard.super(req, res, callback, options);
        }

        /**
         * Returns an object that contains all exported methods for the targeted child.
         * @param child     The child controller class. (not an instance)
         * @returns {*}
         */
        public static exports(child: any = User): any{
            // Export child methods if exist.
            return controller.Controllers.Dashboard.exports(child);
        }

        /**
         * User account, where he can update his personal information.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static create(req, res){
            User.super(req, res, function(req, res, options){
                options.title = 'Create user';

                User.renderView(req, res, options);
            });
        }

        /**
         * Edit the authenticated user.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static edit(req, res){
            User.super(req, res, function(req, res, options){
                options.title = 'Edit user';

                User.renderView(req, res, options);
            });
        }

        /**
         * List users.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static index(req, res){
            User.super(req, res, function(req, res, options){
                options.title = 'Users';

                User.renderView(req, res, options);
            });
        }

        /**
         * Show the user profile.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static show(req, res){
            User.super(req, res, function(req, res, options){
                options.title = 'Show user';

                User.renderView(req, res, options);
            });
        }

        /**
         **************************************************************************************************
         **************************************** Add custom methods **************************************
         **************************************************************************************************
         */

    }
}