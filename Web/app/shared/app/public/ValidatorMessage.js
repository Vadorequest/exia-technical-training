///<reference path='./../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './Message', './MessageLang'], function(require, exports, message, messageLang) {
    /**
    * @name ValidatorMessage
    * @description Message object for both server and client side communication.
    * @author Vadorequest
    */
    var ValidatorMessage = (function (_super) {
        __extends(ValidatorMessage, _super);
        /**
        * Constructor.
        * @param errors    String, ValidatorErrorMessageLang or array of errors.
        * @param data      Data useful for callback, can be anything.
        * @param status    Status of the message.
        */
        function ValidatorMessage(errors, data, status) {
            if (typeof errors === "undefined") { errors = new Array(); }
            if (typeof data === "undefined") { data = {}; }
            if (typeof status === "undefined") { status = true; }
            // Create a _message variable but won't be used actually.
            _super.call(this, '', data, status, ValidatorMessage.FIELD_NAME_TYPE_MESSAGE);
            /**
            * Instance variables overloaded.
            * _message Is not used by this class. Need an array of messages that are actually ValidatorErrorMessageLang instances.
            */
            this._typeMessage = ValidatorMessage.TYPE_MESSAGE;

            // Protect export against bad data such as false or null. (Need an object even empty!)
            if (!this._data) {
                this._data = {};
            }

            this._errors = new Array();
            if (typeof errors === 'string') {
                // Simple error with just a message. Create a custom error.
                this._errors.push(new ValidatorErrorMessageLang(errors));
            } else if (errors instanceof ValidatorErrorMessageLang) {
                // Complex error, just push it.
                this._errors.push(errors);
            } else if (errors instanceof Array) {
                for (var error in errors) {
                    var message = errors[error][ValidatorErrorMessageLang.FIELD_NAME_MESSAGE];
                    var args = errors[error][ValidatorErrorMessageLang.FIELD_NAME_ARGUMENTS];
                    var key = errors[error][ValidatorErrorMessageLang.FIELD_NAME_KEY];

                    if (typeof message === 'object') {
                        // Convert object/array to simple vars.
                        args = message[ValidatorErrorMessageLang.FIELD_NAME_SUB_ARGUMENTS];
                        message = message[ValidatorErrorMessageLang.FIELD_NAME_SUB_MESSAGE];
                    }
                    this._errors.push(new ValidatorErrorMessageLang(message, args, key));
                }
            }
        }
        /**
        * Add an error in the validator errors array.
        * @param message   Error message. Can be string if simple message of object if complex message with variable arguments.
        * @param key       Key of the error. {pseudo, email, etc.}
        * @param args      Args of the message.
        */
        ValidatorMessage.prototype.addError = function (message, key, args) {
            if (typeof key === "undefined") { key = ''; }
            if (typeof args === "undefined") { args = new Array(); }
            if (message) {
                this._errors.push(new ValidatorErrorMessageLang(message, args, key));
                this._status = false;
            } else {
                consoleDev("ValidatorMessage.addValidationError: Unable to add a ValidatorErrorMessageLang object into the array of errors. (Field empty) \nmessage:" + message);
            }
        };

        /**
        * Check if there is at least one error or if the status was explicitly set to false.
        * @returns {boolean}
        */
        ValidatorMessage.prototype.getStatus = function () {
            return (!(this._errors.length > 0) && this._status);
        };

        /**
        * Returns all errors by default, can return an error using its index in the array.
        * If the index is provided then the returned value will be a Message instance, otherwise it will be an array of Message.
        * The methods can return either Message or MessageLang instances, by default it will return Message instances.
        *
        * @param index                 Index of the error to get. Returns all by default.
        * @param returnMessageInstance If true then returns the whole instance if only one error is returned, returns an array of MessageLang otherwise.
        * @returns {*[]}
        */
        ValidatorMessage.prototype.getErrors = function (index, returnMessageInstance) {
            if (typeof index === "undefined") { index = null; }
            if (typeof returnMessageInstance === "undefined") { returnMessageInstance = true; }
            if (!this.getStatus()) {
                if (typeof index === 'undefined' || index === null) {
                    // Returns all errors.
                    return returnMessageInstance ? _.map(this._errors, function (validatorMessage) {
                        return new message.Message(validatorMessage, this._data, this._status);
                    }, this) : _.map(this._errors, function (validatorMessage) {
                        return validatorMessage._message;
                    }, this);
                } else if (this._errors[index]) {
                    // Returns the message only.
                    return returnMessageInstance ? new message.Message(this._errors[index], this._data, this._status) : this._message;
                }
            }

            return false;
        };

        /**
        * Count the number of errors.
        * @return {number}
        */
        ValidatorMessage.prototype.countErrors = function () {
            return typeof this._errors !== 'undefined' ? this._errors.length : 0;
        };

        /**
        * Returns the first error of the errors list.
        * Helper for Message compatibility.
        * @returns {string}
        */
        ValidatorMessage.prototype.getMessage = function (args, translate, language) {
            if (typeof args === "undefined") { args = new Array(); }
            if (typeof translate === "undefined") { translate = true; }
            if (typeof language === "undefined") { language = null; }
            return this._getFirstError().getMessage(args, translate, language);
        };

        /**
        * Returns all messages, concatenated.
        *
        * @param separator
        * @param args      If set, will overload the args already used by the message but not change them.
        * @param translate If true, the message will be translated using the global lang instance object.
        * @param language  Allows to use another language during the translation. Else, the default user language will be used.
        * @return {string}
        */
        ValidatorMessage.prototype.getAllMessages = function (separator, args, translate, language) {
            if (typeof separator === "undefined") { separator = ''; }
            if (typeof args === "undefined") { args = new Array(); }
            if (typeof translate === "undefined") { translate = true; }
            if (typeof language === "undefined") { language = null; }
            var msg = '';
            _.map(this._errors, function (validatorMessage) {
                msg += validatorMessage.getMessage(args, translate, language) + separator;
            });

            return msg;
        };

        /**
        * Returns the first error of the errors list.
        * @returns {*}
        */
        ValidatorMessage.prototype._getFirstError = function () {
            // Check if there is at least an error.
            return !this.getStatus() && this._errors.length > 0 ? this._errors[0] : false;
        };

        /**
        * Returns a custom object without method using the predefined FIELD_NAME to take less space once converted in JSON string.
        * @returns {{}}
        * @private
        */
        ValidatorMessage.prototype._toSimpleObject = function () {
            var json = {};

            // Don't export the message, it's useless.
            //json[ValidatorMessage.FIELD_NAME_MESSAGE] = this._message;
            // If we got data or errors to export.
            if (this._data !== false || !this.getStatus()) {
                // Export data anyway because errors are inside.
                json[ValidatorMessage.FIELD_NAME_DATA] = this._data;

                // If there is at least one error, export the errors.
                if (!this.getStatus()) {
                    json[ValidatorMessage.FIELD_NAME_DATA][ValidatorMessage.FIELD_NAME_ERRORS] = new Array();

                    for (var error in this._errors) {
                        json[ValidatorMessage.FIELD_NAME_DATA][ValidatorMessage.FIELD_NAME_ERRORS].push(this._errors[error].toSimpleObject());
                    }
                }
            }
            json[ValidatorMessage.FIELD_NAME_STATUS] = this._status;
            json[ValidatorMessage.FIELD_NAME_TYPE_MESSAGE] = this._typeMessage;

            return json;
        };

        /**
        ********************************************************
        ******************* Static methods *********************
        ********************************************************
        */
        /**
        * Auto detect the instance type and return an adapted object.
        * @param json  Json to convert to object.
        */
        ValidatorMessage.create = function (json) {
            // Convert json to object.
            return ValidatorMessage.fromJSON(json);
        };

        /**
        * Convert JSON to a ValidatorMessage object instance.
        * @param json  Json to convert to object.
        * @returns {Message}
        */
        ValidatorMessage.fromJSON = function (json) {
            if (typeof json === 'object') {
                return ValidatorMessage._fromJSONObject(json);
            } else if (typeof json === 'string') {
                return ValidatorMessage._fromJSONString(json);
            } else {
                throw "ValidatorMessage.fromJSON " + message.Message.EXCEPTION_BAD_JSON_TYPE;
            }
        };

        /**
        * Convert JSON object to a ValidatorMessage object instance.
        * @param json  Json to convert to object.
        * @returns {ValidatorMessage}
        * @private
        */
        ValidatorMessage._fromJSONObject = function (json) {
            if (json[ValidatorMessage.FIELD_NAME_DATA]) {
                return new ValidatorMessage(json[ValidatorMessage.FIELD_NAME_DATA][ValidatorMessage.FIELD_NAME_ERRORS], json[ValidatorMessage.FIELD_NAME_DATA], json[ValidatorMessage.FIELD_NAME_STATUS]);
            } else {
                return new ValidatorMessage(new Array(), {}, json[ValidatorMessage.FIELD_NAME_STATUS]);
            }
        };

        /**
        * Convert JSON string to a ValidatorMessage object instance.
        * @param json  Json to convert to object.
        * @returns {ValidatorMessage}
        * @private
        */
        ValidatorMessage._fromJSONString = function (json) {
            return ValidatorMessage._fromJSONObject(JSON.parse(json));
        };
        ValidatorMessage.FIELD_NAME_ERRORS = 'e';

        ValidatorMessage.TYPE_MESSAGE = 'v';
        return ValidatorMessage;
    })(message.Message);
    exports.ValidatorMessage = ValidatorMessage;

    /**
    * @name ValidatorErrorMessageLang
    * @description Validator error class, based on MessageLang class.
    * @author Vadorequest
    */
    var ValidatorErrorMessageLang = (function (_super) {
        __extends(ValidatorErrorMessageLang, _super);
        /**
        * Constructor.
        * @param key       Key of the error. {pseudo, email, etc.}
        * @param args      Arguments of the error. Used only for complex errors.
        * @param message   Error message. Can be string if simple message of object if complex message with variable arguments.
        */
        function ValidatorErrorMessageLang(message, args, key) {
            if (typeof message === "undefined") { message = ''; }
            if (typeof args === "undefined") { args = new Array(); }
            if (typeof key === "undefined") { key = ''; }
            _super.call(this, message, args);
            /**
            * Error key.
            */
            this._key = '';
            this._key = key;

            // Avoid to have an object into message because of the MessageLang constructor, just need a string.
            if (typeof this._message !== 'string') {
                this._message = this._message[messageLang.MessageLang.FIELD_NAME_MESSAGE];
            }
        }
        /**
        * Returns the key of the validation error message.
        * @returns {string}
        */
        ValidatorErrorMessageLang.prototype.getKey = function () {
            return this._key;
        };

        /**
        * Returns a custom object without method using the predefined FIELD_NAME to take less space once converted in JSON string.
        * @returns {{}}
        */
        ValidatorErrorMessageLang.prototype.toSimpleObject = function () {
            var json = {};
            json[ValidatorErrorMessageLang.FIELD_NAME_KEY] = this._key;

            if (this.isComplexMessage()) {
                json[ValidatorErrorMessageLang.FIELD_NAME_MESSAGE] = {};
                json[ValidatorErrorMessageLang.FIELD_NAME_MESSAGE][ValidatorErrorMessageLang.FIELD_NAME_SUB_MESSAGE] = this._message;
                json[ValidatorErrorMessageLang.FIELD_NAME_MESSAGE][ValidatorErrorMessageLang.FIELD_NAME_SUB_ARGUMENTS] = this._args;
            } else {
                json[ValidatorErrorMessageLang.FIELD_NAME_MESSAGE] = this._message;
            }

            return json;
        };
        ValidatorErrorMessageLang.FIELD_NAME_KEY = 'k';
        ValidatorErrorMessageLang.FIELD_NAME_SUB_MESSAGE = messageLang.MessageLang.FIELD_NAME_MESSAGE;
        ValidatorErrorMessageLang.FIELD_NAME_SUB_ARGUMENTS = messageLang.MessageLang.FIELD_NAME_ARGUMENTS;
        return ValidatorErrorMessageLang;
    })(messageLang.MessageLang);
    exports.ValidatorErrorMessageLang = ValidatorErrorMessageLang;
});
//# sourceMappingURL=ValidatorMessage.js.map
