///<reference path='./../lib/def/defLoader.d.ts'/>
///<reference path='./ValidatorMessage.ts'/>
///<reference path='./MessageLang.ts'/>
define(["require", "exports", './MessageLang'], function(require, exports, messageLang) {
    /**
    * @name Message
    * @description Message object for both server and client side communication.
    * @author Vadorequest
    */
    var Message = (function () {
        /**
        * Constructor, accept string, arrays, MessageLang instance to build a new message.
        *
        * @param message       Message to display.
        * @param data          Data useful for callback, can be anything.
        * @param status        Status of the message.
        * @param typeMessage   Type of the message. Overloaded by sub classes. Should be private to the sub constructors.
        */
        function Message(message, data, status, typeMessage) {
            if (typeof data === "undefined") { data = {}; }
            if (typeof status === "undefined") { status = false; }
            if (typeof typeMessage === "undefined") { typeMessage = Message.TYPE_MESSAGE; }
            this._typeMessage = Message.TYPE_MESSAGE;
            /**
            * Use to detect a custom Message object.
            */
            this.isCustomMessage = true;
            // If the message is an object or an Array, try to extract message/args from it.
            if ((message instanceof Array || typeof message === 'object') && message !== null && !(message instanceof messageLang.MessageLang)) {
                // If the message contains an array of array then it
                if ((message instanceof Array || typeof message[0] === 'object') && typeof message[0] !== 'string') {
                    // Complex array, contains message, data, status. Syntax used when instantiate a message is not possible.
                    var _message = message[0][0] || '';
                    var _args = message[0][1] || {};
                    data = message[1] || data; // message[1] should contains the data.
                    status = message[2] || status; // message[2] should contains the status.
                } else if (typeof message[messageLang.MessageLang.FIELD_NAME_MESSAGE] === 'string') {
                    // The message come from a language file.
                    var _message = message[messageLang.MessageLang.FIELD_NAME_MESSAGE];
                    var _args = message[messageLang.MessageLang.FIELD_NAME_ARGUMENTS] ? message[messageLang.MessageLang.FIELD_NAME_ARGUMENTS] : {};
                } else {
                    // Simple array, message should be at [0] and args at [1].
                    // Get the message and args by location in the array or by key. Priority to the location.
                    var _message = message[0] || '';
                    var _args = message[1] || new Array();
                }

                this._message = new messageLang.MessageLang(_message, _args);
            } else if (!(message instanceof messageLang.MessageLang)) {
                // Simple message, generate simple message using MessageLang constructor.
                this._message = new messageLang.MessageLang(message);
            } else {
                // Load the complex instance.
                this._message = message;
            }
            this._data = data;
            this._status = status;
            this._typeMessage = typeMessage;
        }
        /**
        * Returns the entire message, auto translate. Can use extra args and extra language.
        *
        * @param args      If set, will overload the args already used by the message but not change them.
        * @param translate If true, the message will be translated using the global lang instance object.
        * @param language  Allows to use another language during the translation. Else, the default user language will be used.
        *
        * @returns {string}
        */
        Message.prototype.getMessage = function (args, translate, language) {
            if (typeof args === "undefined") { args = new Array(); }
            if (typeof translate === "undefined") { translate = true; }
            if (typeof language === "undefined") { language = null; }
            return this._message.getMessage(args, translate, language);
        };

        /**
        * Returns all messages, concatenated.
        * Not useful in this class, but it is with extended classes that can contain several messages.
        *
        * @param separator
        * @param args      If set, will overload the args already used by the message but not change them.
        * @param translate If true, the message will be translated using the global lang instance object.
        * @param language  Allows to use another language during the translation. Else, the default user language will be used.
        * @return {string}
        */
        Message.prototype.getAllMessages = function (separator, args, translate, language) {
            if (typeof separator === "undefined") { separator = ''; }
            if (typeof args === "undefined") { args = new Array(); }
            if (typeof translate === "undefined") { translate = true; }
            if (typeof language === "undefined") { language = null; }
            return this.getMessage(args, translate, language);
        };

        /**
        * Determines if the Message contains a message.
        *
        * @returns {boolean}
        */
        Message.prototype.hasMessage = function () {
            return this._message._message !== null;
        };

        /**
        * Returns the current configured message.
        *
        * @returns {MessageLang}
        */
        Message.prototype.getMessageLang = function () {
            return this._message;
        };

        /**
        * Set the message and the args of the message.
        * Can be used once the message was created, to change the message without change the arguments, for instance.
        *
        * @param message   Message, can be a string or an instance of MessageLang.
        * @param args      If message is a string then you can pass args. If no args then will use the args from the current message.
        *
        * @return {Message}
        */
        Message.prototype.setMessageLang = function (message, args) {
            if (message instanceof messageLang.MessageLang) {
                this._message = message;
            } else {
                this._message = new messageLang.MessageLang(message, args ? args : this._message._args);
            }
            return this;
        };

        /**
        * Get message data.
        *
        * @returns {*}
        */
        Message.prototype.getData = function () {
            return this._data;
        };

        /**
        * Get a data by key.
        *
        * @returns {*}
        * TODO Improve the system with strings separated by dot to retrieve data from sub data.
        */
        Message.prototype.getDataByKey = function (key, defaultValue) {
            if (typeof defaultValue === "undefined") { defaultValue = {}; }
            if (this.keyExists(key)) {
                return this._data[key];
            } else {
                return defaultValue;
            }
        };

        /**
        * Check if the key exists in the data.
        *
        * @param key           Key to check.
        *
        * @returns {boolean}
        * TODO Improve the system with strings separated by dot to check data from sub data.
        */
        Message.prototype.keyExists = function (key) {
            return this._data && typeof this._data[key] !== "undefined";
        };

        /**
        * Add a key/value pair in the data object.
        *
        * @param key       Key used to store the value.
        * @param value     Can be anything.
        */
        Message.prototype.addData = function (key, value) {
            this._data[key] = value;
        };

        /**
        * Get message status.
        *
        * @returns {boolean}
        */
        Message.prototype.getStatus = function () {
            return this._status;
        };

        /**
        * Get type of the message.
        *
        * @returns {string}
        */
        Message.prototype.getType = function () {
            return this._typeMessage;
        };

        /**
        * Set type of the message.
        *
        * @param   typeMessage
        *
        * @returns {Message}
        */
        Message.prototype.setType = function (typeMessage) {
            this._typeMessage = typeMessage;
            return this;
        };

        /**
        * Returns the error if there is any or returns false. The index must be 0.
        * If the index is provided then the returned value will be a Message instance, otherwise it will be an array of Message.
        * The methods can return either Message or MessageLang instances, by default it will return Message instances.
        *
        * @param index                 Not used here.
        * @param returnMessageInstance If true then returns the whole instance, returns only the MessageLang otherwise.
        * @returns {*[]}
        */
        Message.prototype.getErrors = function (index, returnMessageInstance) {
            if (typeof returnMessageInstance === "undefined") { returnMessageInstance = true; }
            if (!this.getStatus()) {
                if (typeof index === 'undefined' || index === null) {
                    // Returns all errors.
                    return returnMessageInstance ? [this] : [this._message];
                } else if (index === 0) {
                    // Returns the message only.
                    return returnMessageInstance ? this : this._message;
                }
            }

            return false;
        };

        /**
        * Count the number of errors contained in the message.
        * The Message class can contain only one error, but extended classes could have more.
        * @return {number}
        */
        Message.prototype.countErrors = function () {
            return (!this.getStatus() && this._message !== null) ? 1 : 0;
        };

        /**
        * Returns the current object as JSON string.
        *
        * @returns {string}
        */
        Message.prototype.toJSON = function () {
            return JSON.stringify(this._toSimpleObject());
        };

        /**
        * Returns the current object without methods.
        *
        * @returns {Object}
        */
        Message.prototype.toObject = function () {
            return this._toSimpleObject();
        };

        /**
        * Returns a custom object without method using the predefined FIELD_NAME to take less space once converted in JSON string.
        *
        * @returns {{}}
        * @private
        */
        Message.prototype._toSimpleObject = function () {
            var json = {};
            json[Message.FIELD_NAME_MESSAGE] = this._message.toSimpleObject();
            if (this._data !== false) {
                json[Message.FIELD_NAME_DATA] = this._data;
            }
            json[Message.FIELD_NAME_STATUS] = this._status;
            json[Message.FIELD_NAME_TYPE_MESSAGE] = this._typeMessage;

            return json;
        };

        /**
        ********************************************************
        ******************* Static methods *********************
        ********************************************************
        */
        /**
        * Auto detect the instance type and return an adapted object.
        *
        * @param json  Json to convert to object.
        */
        Message.create = function (json) {
            // Convert json to object.
            var message = Message.fromJSON(json);
            if (message.getType() === Message.TYPE_MESSAGE) {
                return message;
            } else if (message.getType() === __validatorMessage.TYPE_MESSAGE) {
                return __validatorMessage.fromJSON(json);
            } else {
                consoleDev('Type of Message undefined: ' + message.getType());
                return null;
            }
        };

        /**
        * Convert JSON to a Message object instance.
        *
        * @param json  Json to convert to object.
        *
        * @returns {Message.Message}
        */
        Message.fromJSON = function (json) {
            if (typeof json === 'object') {
                return Message._fromJSONObject(json);
            } else if (typeof json === 'string') {
                return Message._fromJSONString(json);
            } else {
                throw "Message.fromJSON " + Message.EXCEPTION_BAD_JSON_TYPE;
            }
        };

        /**
        * Convert JSON object to a Message object instance.
        *
        * @param json  Json to convert to object.
        *
        * @returns {Message.Message}
        * @private
        */
        Message._fromJSONObject = function (json) {
            if (json[Message.FIELD_NAME_DATA]) {
                return new Message(json[Message.FIELD_NAME_MESSAGE], json[Message.FIELD_NAME_DATA], json[Message.FIELD_NAME_STATUS], json[Message.FIELD_NAME_TYPE_MESSAGE]);
            } else {
                return new Message(json[Message.FIELD_NAME_MESSAGE], false, json[Message.FIELD_NAME_STATUS], json[Message.FIELD_NAME_TYPE_MESSAGE]);
            }
        };

        /**
        * Convert JSON string to a Message object instance.
        *
        * @param json  Json to convert to object.
        *
        * @returns {Message.Message}
        * @private
        */
        Message._fromJSONString = function (json) {
            try  {
                return Message._fromJSONObject(JSON.parse(json));
            } catch (e) {
                // Sometimes, the JSON can be wrong with backslashes. It happens when we get it from EJS for instance.
                return Message._fromJSONObject(JSON.parse(json.replace(/\\/g, '').replace(/"{/g, "'{").replace(/}"/g, "}'")));
            }
        };
        Message.FIELD_NAME_MESSAGE = messageLang.MessageLang.FIELD_NAME_MESSAGE;
        Message.FIELD_NAME_DATA = 'd';
        Message.FIELD_NAME_STATUS = 's';
        Message.FIELD_NAME_TYPE_MESSAGE = 't';
        Message.TYPE_MESSAGE = 'm';

        Message.EXCEPTION_BAD_JSON_TYPE = 'Incorrect data type. Object or string expected.';
        return Message;
    })();
    exports.Message = Message;
});
//# sourceMappingURL=Message.js.map
