///<reference path='./../lib/def/defLoader.d.ts'/>

import controller = require('./../../shared/app/core/controllers/CoreController');
declare var require;

export module Controllers {

    /**
     * Our own and custom implementation of the core controller.
     */
    export class Controller extends controller.CoreControllers.Controller {

        /**
         * Default view renderer, manages basic data and stuff to always bind into the views.
         * @param req           Request.
         * @param res           Response.
         * @param options   Specific options to render the view.
         * @param view          View to load. Use the path controller/method by default.
         */
        public static renderView(req, res, options: any = {}, view: any = false){
            // Call super.
            controller.CoreControllers.Controller.renderView(req, res, options, view);
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
        public static super(req, res, callback, options: any = {}){
            controller.CoreControllers.Controller.super(req, res, callback, options);
        }
    }
}