///<reference path='./../../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var model = require('./Model');

(function (Models) {
    /**
    * Model used to manage the users of the application.
    * The model is primary static, but, to make it easy to use, some things are also stored for each instance.
    * That allows the code to use both Model or instance of Model such as:
    *      Model.schema
    *      model.Schema
    */
    var UserModel = (function (_super) {
        __extends(UserModel, _super);
        function UserModel() {
            _super.apply(this, arguments);
            /**
            * Helpers to always get the property, from instance or static.
            */
            this.modelName = UserModel.modelName;
            this.schema = UserModel.schema;
            this.model = UserModel.model;
        }
        /**
        * Returns the current mongoose.Schema customized instance.
        * All instance methods can be overloaded or written here.
        *
        * @param ChildModel    Child model that made the call.
        * @returns {*}
        * @see http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
        */
        UserModel.getNewSchemaInstance = function (ChildModel) {
            var _this = this;
            // Execute the parent changes on the schema.
            var schema = model.Models.Model.getNewSchemaInstance(ChildModel);

            // Overload methods.
            //schema.methods.toObject = function(callback){}
            /**
            * Is the user authenticated?
            *
            * @return {boolean}
            */
            schema.methods.isAuth = function () {
                var self = _this;
                return self.connected ? true : false;
            };

            return schema;
        };

        /**
        * Returns the protected fields.
        * @returns {string[]}
        */
        UserModel.getProtectedFields = function () {
            return this._protectedFields;
        };

        /**
        * Returns the fields that will be automatically updated on authentication.
        * @returns {string[]}
        */
        UserModel.getFieldsToUpdateOnAuth = function () {
            return this._fieldsToUpdateOnAuth;
        };

        /**
        * If a DB error happens during the authentication, we use a customized method to deal with the error to display.
        * Basically we add an extra message more "user friendly".
        *
        * @param error         Error returned by our error handler.
        * @return {Message}
        */
        UserModel.authenticationErrorMessage = function (error) {
            var args = error.getMessageLang().getArgs();

            // Add to the initial message a more specific message.
            args.originalMessage = error.getMessage();
            return error.setMessageLang('__41', args);
        };
        UserModel.modelName = 'User';

        UserModel.schema = require('../schemas/userSchema.js');

        UserModel.indexes = [];

        UserModel.applyMiddleware = function (schema) {
            // Apply the parent middleware.
            schema = model.Models.Model.applyMiddleware(schema);

            return schema;
        };

        UserModel.Schema = UserModel.getNewSchemaInstance(UserModel);

        UserModel.model = UserModel.getNewModelInstance(UserModel);

        UserModel._protectedFields = [
            'login',
            'nickname',
            'email',
            'role',
            'enabled',
            'nativeLanguage',
            'usedLanguages'
        ];

        UserModel._fieldsToUpdateOnAuth = [
            'nickname',
            'email',
            'nativeLanguage',
            'usedLanguages'
        ];
        return UserModel;
    })(model.Models.Model);
    Models.UserModel = UserModel;

    /**
    * Don't forget that some methods such as exists() are written in the Model class and available for all Models.
    * The following methods belong ONLY to the mongoose model instance, not to the Model class itself!
    *
    *************************************************************************************************
    ******************************** Extended Model methods *****************************************
    *************************************************************************************************
    */
    /**
    * Get the protected fields for the found user.
    *
    * @param user      User to find.
    * @param callback  Callback to execute.
    */
    UserModel.model.getProtectedInformation = function (user, callback) {
        // We are looking for an unique user.
        UserModel.model.exists(user, function (err, userFound) {
            if (err) {
                UserModel.model.errorHandler(err, UserModel, callback);
            } else {
                // Load public profile.
                UserModel.model._getProtectedInformation(userFound, function (userPublic) {
                    // Provides only public fields.
                    callback(new __message('', { err: err, user: userPublic }, err ? false : true));
                });
            }
        });
    };

    /**
    * Check if the couple login/password are correct from the game server.
    * If so then will check if the user already exists in the database, if it does then it will just initialize the session using the data from the local database.
    * If the user doesn't exists then it will call the method "refreshSession" that will initialize the user profile in this database.
    *
    * @param userGame      User data as Mongoose object from the game server.
    * @param callback      Callback to execute, should update the user session.
    */
    UserModel.model.authentication = function (userGame, callback) {
        // Check if the user exists on this application.
        UserModel.model.exists({ login: userGame.login }, function (err, userLocal) {
            if (userLocal) {
                // The user is already present in the database of this application.
                if (userGame.enabled && userLocal.enabled) {
                    // He has access to this application. Update his data from the one just got from the game.
                    _.each(UserModel.getFieldsToUpdateOnAuth(), function (key) {
                        // Update each local field by the value from the game.
                        userLocal[key] = userGame[key];
                    });

                    // Save the updated user in this application database.
                    userLocal.save(function (err) {
                        if (err) {
                            UserModel.model.errorHandler(err, traceback(), function (err) {
                                // If we get an error here that means that the account on the game is misconfigured.
                                callback(UserModel.authenticationErrorMessage(err));
                            });
                        } else {
                            callback(new __message(new __messageLang('__42', { nickname: userLocal.nickname, lang: userLocal.nativeLanguage }), { user: userLocal }, true));
                        }
                    });
                } else {
                    callback(new __message('__43'));
                }
            } else {
                userGame.reputation = 0;

                // The user doesn't exists in this application yet, create it.
                UserModel.model.create(userGame, function (err, userLocal) {
                    if (err) {
                        UserModel.model.errorHandler(err, traceback(), function (err) {
                            // If we get an error here that means that the account on the game is misconfigured.
                            callback(UserModel.authenticationErrorMessage(err));
                        });
                    } else {
                        if (userLocal.enabled) {
                            // The created user has right to access to this application.
                            callback(new __message(new __messageLang('__44', { nickname: userLocal.nickname, lang: userLocal.nativeLanguage }), { user: userLocal }, true));
                        } else {
                            callback(new __message('__43'));
                        }
                    }
                });
            }
        });
    };

    /**
    * Initialize or refresh the user session for the current authenticated user.
    *
    * @param req       Request.
    * @param user      User data to refresh.
    * @param callback  Callback to execute.
    */
    UserModel.model.refreshSession = function (req, user, callback) {
        // Save the whole user in the session. TODO Maybe filter some fields, we don't have passwords here so that's not a security issue yet but I didn't really think about it yet.
        req.session.user = user.toObject();
        req.session.user.connected = true;

        callback(req, user);
    };

    /**
    *************************************************************************************************
    *************************** Methods to use only locally (private) *******************************
    *************************************************************************************************
    */
    /**
    * Get the protected fields of a user.
    *
    * @param user  Instance of model.
    * @param callback  Callback to execute.
    * @private
    */
    UserModel.model._getProtectedInformation = function (user, callback) {
        var userPublic = {};

        // Get fields to share.
        var publicFields = UserModel.getProtectedFields();

        for (var field in publicFields) {
            userPublic[publicFields[field]] = user[publicFields[field]];
        }

        callback(userPublic);
    };
})(exports.Models || (exports.Models = {}));
var Models = exports.Models;
//# sourceMappingURL=UserModel.js.map
