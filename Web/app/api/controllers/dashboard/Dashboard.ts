///<reference path='./../../lib/def/defLoader.d.ts'/>

import controller = require('./../Controller');

/**
 * Package that contains all Controllers.
 */
export module Controllers {

    /**
     * This controller is a namespace (NS) controller.
     * It is inherited by all controllers in the same folder. It is possible to set properties that will be applied to all controllers inheriting this NS controller.
     */
    export class Dashboard extends controller.Controllers.Controller {

        /**
         * Layout used by the controller by default.
         */
        public static layout: string = 'dashboard';

        /**
         * Relative path to a layout from a view.
         */
        public static layoutRelativePath: string = '../../_layouts/';

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
            // Do not override the controller to use in the child!
            if(!options.Controller){
                options.Controller = Dashboard;// Bind the controller to use in every single request but only if undefined.
            }

            controller.Controllers.Controller.super(req, res, callback, options);
        }

        /**
         * Returns an object that contains all exported methods for the targeted child.
         * @param child     The child controller class. (not an instance)
         * @returns {*}
         */
        public static exports(child: any = Dashboard): any{
            // Export child methods if exist.
            return controller.Controllers.Controller.exports(child);
        }

        /**
         * List accesses.
         *
         * @param req       Request.
         * @param res       Response.
         */
        public static index(req, res){
            Dashboard.super(req, res, function(req, res, options){
                options.title = 'Administration';

                Dashboard.renderView(req, res, options);
            });
        }

        /**
         **************************************************************************************************
         **************************************** Add custom methods **************************************
         **************************************************************************************************
         */

    }
}