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
    var User = (function (_super) {
        __extends(User, _super);
        function User() {
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
        User.super = function (req, res, callback, options) {
            if (typeof options === "undefined") { options = {}; }
            options.Controller = User; // Bind the controller to use in every single request.
            controller.Controllers.Controller.super(req, res, callback, options);
        };

        /**
        * Returns an object that contains all exported methods for the targeted child.
        * @param child     The child controller class. (not an instance)
        * @returns {*}
        */
        User.exports = function (child) {
            if (typeof child === "undefined") { child = User; }
            // Export child methods if exist.
            return controller.Controllers.Controller.exports(child);
        };

        /**
        * User account, where he can update his personal information.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.create = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Create user';

                User.renderView(req, res, options);
            });
        };

        /**
        * Edit the authenticated user.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.edit = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Edit user';

                User.renderView(req, res, options);
            });
        };

        /**
        * List users.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.index = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Users';

                User.renderView(req, res, options);
            });
        };

        /**
        * Show the user profile.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.show = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Show user';

                User.renderView(req, res, options);
            });
        };

        /**
        **************************************************************************************************
        **************************************** Add custom methods **************************************
        **************************************************************************************************
        */
        /**
        * User account.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.account = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = 'Account';

                User.renderView(req, res, options);
            });
        };

        /**
        * User public profile.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.profile = function (req, res) {
            User.super(req, res, function (req, res, options) {
                options.title = req.session.user.nickname + ' profile';

                User.renderView(req, res, options);
            });
        };

        /**
        * User authentication.
        *
        * @param req       Request.
        * @param res       Response.
        */
        User.authentication = function (req, res) {
            User.super(req, res, function (req, res, options) {
                __validator.check([
                    __validator.rulesUserLogin(req.param('login')),
                    __validator.rulesUserPasswordProtected(req.param('password'))
                ], function (errors, keysModelChecked, keysChecked) {
                    // Ask to the game webservice to check the authentication. Password will be hashed again there.
                    __request.send('user', 'authentication', keysModelChecked, { res: res }, function (message, response) {
                        if (message.getStatus()) {
                            // Login and password are corrects. We have to connect the user.
                            var User = __Dao.getModel('user');

                            // Update the information about the user by the one coming from the Game.
                            User.authentication(message.getDataByKey('user'), function (message) {
                                if (message.getStatus()) {
                                    // The user data have been refreshed.
                                    User.refreshSession(req, message.getDataByKey('user'), function (req, user) {
                                        console.log(req.session.user);
                                    });
                                }

                                // Send the message anyay.
                                res.json(__format.response(message));
                            });
                        } else {
                            res.json(__format.response(message));
                        }
                    });
                }, res);
            });
        };
        User.exportedMethods = [
            'account',
            'authentication',
            'profile'
        ];
        return User;
    })(controller.Controllers.Controller);
    Controllers.User = User;
})(exports.Controllers || (exports.Controllers = {}));
var Controllers = exports.Controllers;
//# sourceMappingURL=User.js.map
