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
            'visitor',
            'member',
            'admin'
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
                options.title = 'Ayolan Translation application';

                Home.renderView(req, res, options);
            });
        }

        /**
         **************************************************************************************************
         **************************************** Add custom methods **************************************
         **************************************************************************************************
         */

        /**
         * Temp page, just to fake the fact that the user is a visitor not connected.
         * @param req       Request.
         * @param res       Response.
         */
        public static visitor(req, res){
            Home.super(req, res, function(req, res, options){
                req.session.user.connected = false;
                req.session.user.role = null;
                options.title = 'You are now a VISITOR!';
                req.flash('messages', new __message('__49', {type: 'info', placement: {from: 'top', align: 'left'}}));

                Home.renderView(req, res, options, 'home/index');
            });
        }

        /**
         * Temp page, just to fake the fact that the user is connected as member.
         * @param req       Request.
         * @param res       Response.
         */
        public static member(req, res){
            Home.super(req, res, function(req, res, options){
                req.session.user.connected = true;
                req.session.user.role = 'member';
                options.title = 'You are now a MEMBER!';
                req.flash('messages', new __message('__48', {type: 'success', placement: {from: 'bottom'}}));

                Home.renderView(req, res, options, 'home/index');
            });
        }

        /**
         * Temp page, just to fake the fact that the user is connected as admin.
         * @param req       Request.
         * @param res       Response.
         */
        public static admin(req, res){
            Home.super(req, res, function(req, res, options){
                req.session.user.connected = true;
                req.session.user.role = 'admin';
                options.title = 'You are now a ADMIN!';
                req.flash('messages', new __message('__47', {type: 'info', placement: {from: 'top'}}));

                Home.renderView(req, res, options, 'home/index');
            });
        }

        /**
         **************************************************************************************************
         **************************************** Override magic methods **********************************
         **************************************************************************************************
         */
    }
}