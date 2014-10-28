///<reference path='./../../lib/def/defLoader.d.ts'/>
(function (CoreControllers) {
    /**
    *
    * First, the super method is called.
    * It calls a magic method such as __beforeIndex if the request was coming from an index method.
    * If it doesn't found the origin, it calls directly __beforeEach method.
    * If it does then the __beforeIndex will automatically call the __beforeEach in first place.
    * Once all the __before magic methods are called, the custom method from the child is executed.
    * The options object contains specific stuff that belongs to the controllers logic, I could have use the req but I prefer not.
    *
    * The public methods such as index/show/etc. are defined but send by default a 404 response if they are not override in the child class.
    * They exists just to bind by default all these methods without take care if they exists or not.
    */
    var Controller = (function () {
        function Controller() {
        }
        /**
        **************************************************************************************************
        **************************************** Static methods ******************************************
        **************************************************************************************************
        */
        /**
        * Acts as a super workflow controller to automatically call events when it's possible.
        * Used to call magic methods before the targeted methods is called.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        *          controller  Controller      Child controller class. (static)
        *
        */
        Controller.super = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            var currentController = Controller._getCurrentController(options);

            // Extract information from the child. req.target is sails < 0.10 compatible, req.options is sails >0.10 compatible.
            options.controller = req.target && req.target.controller ? req.target.controller : req.options.controller;
            options.action = req.target && req.target.action ? req.target.action : req.options.action;

            // Check that the dedicated method has a __before magic method in the current controller.
            if (currentController['__before' + Controller._cleanMethodName(options.action)]) {
                // Custom before method is available. Call it. Remove underscores by security. (Protected/private methods)
                currentController['__before' + Controller._cleanMethodName(options.action)](req, res, callback, options);
            } else {
                // By default, always call the global magic method.
                currentController['__beforeEach'](req, res, callback, options);
            }
        };

        /**
        * Methods which MUST BE OVERRIDE in ALL childs.
        * Returns an object that contains all exported methods for the targeted child.
        *
        * @param child     The child controller class. (not an instance)
        * @returns {*}
        */
        Controller.exports = function (child) {
            if (!child) {
                throw 'The exports method must be override in all Controller childs: ' + __filename;
            }

            // Merge default array and custom array from child.
            var methods = Controller._defaultExportedMethods.concat(child['exportedMethods']);
            var exportedMethods = {};

            for (var i = 0; i < methods.length; i++) {
                // Check if the method exists.
                if (typeof child[methods[i]] !== 'undefined') {
                    // Check that the method shouldn't be private. (Exception for _config, which is a sails config)
                    if (methods[i][0] !== '_' || methods[i] === '_config') {
                        exportedMethods[methods[i]] = child[methods[i]];
                    } else {
                        console.error('The method "' + methods[i] + '" is not public and cannot be exported. ' + child);
                    }
                } else {
                    console.error('The method "' + methods[i] + '" does not exist on the controller ' + child);
                }
            }

            return exportedMethods;
        };

        /**
        * Default view renderer, manages basic data and stuff to always bind into the views.
        *
        * @param req           Request.
        * @param res           Response.
        * @param options       Specific options to render the view.
        * @param view          View to load. Use the path controller/method by default.
        */
        Controller.renderView = function (req, res, options, view) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof view === "undefined") { view = false; }
            var currentController = Controller._getCurrentController(options);

            // Bind default data.
            options._layoutFile = currentController._getLayout(options);

            // Bind automatically the content into each views, even partials called by the main view. Don't erase native res.locals (bind by the sails middleware) but override/add them.
            res.locals = _.mergePriority(res.locals, {
                action: options.action,
                Controller: currentController,
                controller: options.controller,
                currentUser: options.currentUser || req.session.user,
                date: new Date().getTime(),
                layout: options.layout || currentController.layout,
                theme: options.theme || currentController._getCurrentController(options).theme,
                flash: req.flash ? req.flash() : {}
            });

            // If the controller called belongs to a sub module.
            if ((options.controller.split('/')).length > 1) {
                currentController.renderViewSubModule(req, res, options, view);
            } else {
                try  {
                    // The controller is "basic", it doesn't belong to a sub module.
                    if (view === false) {
                        return res.view(options);
                    } else {
                        return res.view(view, options);
                    }
                } catch (e) {
                    // Catch correctly any failure, because for instance if the view doesn't exists it would display Converting circular structure to JSON. Not really helpful!
                    // TODO Catch the exception in a better way and maybe do something better.
                    res.render(e);
                }
            }
        };

        /**
        * View renderer adapted to manage to render a view that belongs to a sub module of the application.
        *
        * @param req           Request.
        * @param res           Response.
        * @param options       Specific options to render the view.
        * @param view          View to load. Use the path controller/method by default.
        */
        Controller.renderViewSubModule = function (req, res, options, view) {
            if (typeof options === "undefined") { options = {}; }
            if (typeof view === "undefined") { view = false; }
            if (view) {
                // Custom path, just add the backoffice folder.
                view = options.controller + '/' + view;
            } else {
                // No path, use the targets to know which view to call.
                view = options.controller + '/' + options.action;
            }

            return res.view(view, options);
        };

        /**
        **************************************************************************************************
        **************************************** Controller basic methods ********************************
        **************************************************************************************************
        */
        /**
        * Displays the global content, displays several resources.
        * This method is just to return a 404 error and explain the role.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        */
        Controller.index = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            Controller.__beforeIndex(req, res, function (req, res, callback, options) {
                res.notFound();
            }, options);
        };

        /**
        * Show only one resource. (Focuses on one, not many)
        * This method is just to return a 404 error and explain the role.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        */
        Controller.show = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            Controller.__beforeShow(req, res, function (req, res, callback, options) {
                res.notFound();
            }, options);
        };

        /**
        * Display the content to create a new resource.
        * This method is just to return a 404 error and explain the role.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        */
        Controller.new = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            Controller.__beforeNew(req, res, function (req, res, callback, options) {
                res.notFound();
            }, options);
        };

        /**
        * Manage the request to create a new resource.
        * Basically called from a "new" view.
        * This method is just to return a 404 error and explain the role.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        */
        Controller.create = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            Controller.__beforeCreate(req, res, function (req, res, callback, options) {
                res.notFound();
            }, options);
        };

        /**
        * Display the content to edit an existing resource.
        * This method is just to return a 404 error and explain the role.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        */
        Controller.edit = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            Controller.__beforeEdit(req, res, function (req, res, callback, options) {
                res.notFound();
            }, options);
        };

        /**
        * Manage the request to update an existing resource.
        * Basically called from an "edit" view.
        * This method is just to return a 404 error and explain the role.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        */
        Controller.update = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            Controller.__beforeUpdate(req, res, function (req, res, callback, options) {
                res.notFound();
            }, options);
        };

        /**
        * Destroy a resource.
        * This method is just to return a 404 error and explain the role.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        */
        Controller.destroy = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            Controller.__beforeDestroy(req, res, function (req, res, callback, options) {
                res.notFound();
            }, options);
        };

        /**
        **************************************************************************************************
        **************************************** Magic methods *******************************************
        **************************************************************************************************
        */
        /**
        * Automatically triggered before each called method.
        * Allow to execute some code that will be executed by all methods of all controllers.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        * @private
        */
        Controller.__beforeEach = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            // Default user.
            if (!req.session.user) {
                req.session.user = {};
            }

            // Add debug information.
            // TODO Use express middleware instead...
            consoleDev('---' + '----------------- start -------------------', 'debug');
            consoleDev('Url: ' + req.method + ' ' + req.baseUrl + req._parsedUrl.href, 'debug');

            if (!_.isEmpty(req.body)) {
                consoleDev('Parameters: ' + JSON.stringify(req.body), 'debug');
            }

            consoleDev('Options: ' + CircularJSON.stringify(options), 'debug');
            consoleDev('Route: ' + req.route.method + ' => ' + req.path + ' (' + req.route.regexp + ')', 'debug');

            if (typeof req.headers.cookie !== "undefined") {
                consoleDev('Cookies: ' + req.headers.cookie, 'debug');
            }

            if (typeof req.headers['user-agent'] !== "undefined") {
                consoleDev('User agent: ' + req.headers['user-agent'], 'debug');
            }

            consoleDev('Session: ' + JSON.stringify(req.session), 'debug');
            consoleDev('---------------------------------------', 'debug');

            // Once we have done the stuff common to all methods, execute the actual callback.
            callback(req, res, options);
        };

        /**
        * Automatically triggered before all index methods are called.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        * @private
        */
        Controller.__beforeIndex = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            (Controller._getCurrentController(options)).__beforeEach(req, res, function (req, res, options) {
                callback(req, res, options);
            }, options);
        };

        /**
        * Automatically triggered before all show methods are called.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        * @private
        */
        Controller.__beforeShow = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            (Controller._getCurrentController(options)).__beforeEach(req, res, function (req, res, options) {
                callback(req, res, options);
            }, options);
        };

        /**
        * Automatically triggered before all new methods are called.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        * @private
        */
        Controller.__beforeNew = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            (Controller._getCurrentController(options)).__beforeEach(req, res, function (req, res, options) {
                callback(req, res, options);
            }, options);
        };

        /**
        * Automatically triggered before all create methods are called.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        * @private
        */
        Controller.__beforeCreate = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            (Controller._getCurrentController(options)).__beforeEach(req, res, function (req, res, options) {
                callback(req, res, options);
            }, options);
        };

        /**
        * Automatically triggered before all edit methods are called.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        * @private
        */
        Controller.__beforeEdit = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            (Controller._getCurrentController(options)).__beforeEach(req, res, function (req, res, options) {
                callback(req, res, options);
            }, options);
        };

        /**
        * Automatically triggered before all update methods are called.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        * @private
        */
        Controller.__beforeUpdate = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            (Controller._getCurrentController(options)).__beforeEach(req, res, function (req, res, options) {
                callback(req, res, options);
            }, options);
        };

        /**
        * Automatically triggered before all destroy methods are called.
        *
        * @param req       Request.
        * @param res       Response.
        * @param callback  Function to execute.
        * @param options   Object that contains options.
        * @private
        */
        Controller.__beforeDestroy = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            (Controller._getCurrentController(options)).__beforeEach(req, res, function (req, res, options) {
                callback(req, res, options);
            }, options);
        };

        /**
        **************************************************************************************************
        **************************************** Private methods *****************************************
        **************************************************************************************************
        */
        /**
        * Based on the option, used to determinate which controller class use, a child if exists or the parent.
        *
        * @param options   See args explained at Controller.super
        * @returns {*}
        * @private
        */
        Controller._getCurrentController = function (options) {
            if (options.Controller) {
                return options.Controller;
            } else {
                return Controller;
            }
        };

        /**
        * Clean the name of a method to avoid anything bad.
        *
        * @param method
        * @returns {*}
        * @private
        */
        Controller._cleanMethodName = function (method) {
            return _.str.capitalize(method.replace('_', ''));
        };

        /**
        * Should return the layout to use without have to take care of the relative path, it should be managed by the controller.
        *
        * @param options       Specific options to render the view.
        * @returns {string}
        * @private
        */
        Controller._getLayout = function (options) {
            if (typeof options === "undefined") { options = {}; }
            return Controller._getCurrentController(options).layoutRelativePath + (options.layout || Controller._getCurrentController(options).layout);
        };
        Controller._defaultExportedMethods = [
            '_config',
            'index',
            'show',
            'new',
            'create',
            'edit',
            'update',
            'destroy'
        ];

        Controller._config = {};

        Controller.exportedMethods = [];

        Controller.theme = 'ayolan';

        Controller.layout = 'default';

        Controller.layoutRelativePath = '../_layouts/';
        return Controller;
    })();
    CoreControllers.Controller = Controller;
})(exports.CoreControllers || (exports.CoreControllers = {}));
var CoreControllers = exports.CoreControllers;
//# sourceMappingURL=CoreController.js.map
