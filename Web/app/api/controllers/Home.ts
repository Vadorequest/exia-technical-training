///<reference path='./../lib/def/defLoader.d.ts'/>

import controller = require('./Controller');

/**
 * Package that contains all Controllers.
 */
export module Controllers {

    export class Home extends controller.Controllers.Controller {

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
            options.Controller = Home;// Bind the controller to use in every single request.
            controller.Controllers.Controller.super(req, res, callback, options);
        }

        /**
         * Returns an object that contains all exported methods for the targeted child.
         * @param child     The child controller class. (not an instance)
         * @returns {*}
         */
        public static exports(child: any = Home): any{
            // Export child methods if exist.
            return controller.Controllers.Controller.exports(child);
        }

        /**
         * Index page. Main page.
         * @param req       Request.
         * @param res       Response.
         */
        public static index(req, res){
            Home.super(req, res, function(req, res, options){
                options.title = 'Parallax scrolling demo';
                options.game = {
                    width: 800,
                    height: 600
                };

                Home.renderView(req, res, options);
            });
        }

        /**
         **************************************************************************************************
         **************************************** Add custom methods **************************************
         **************************************************************************************************
         */

        /**
         **************************************************************************************************
         **************************************** Override magic methods **********************************
         **************************************************************************************************
         */
    }
}