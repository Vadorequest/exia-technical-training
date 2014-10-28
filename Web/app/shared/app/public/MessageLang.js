///<reference path='./../lib/def/defLoader.d.ts'/>
define(["require", "exports"], function(require, exports) {
    /**
    * @name MessageLang
    * @description Language message content class.
    * @author Vadorequest
    * TODO Add interface IMarkdownMessage, implement it. Also use new fields to know if the MessageLang was translated and "markdowned".
    */
    var MessageLang = (function () {
        /**
        * Constructor for simple messages.
        * @param message   Error message.
        * @param args      Arguments of the message.
        */
        function MessageLang(message, args) {
            if (typeof message === "undefined") { message = ''; }
            if (typeof args === "undefined") { args = new Array(); }
            /**
            * Error message, contains the message or the message code.
            */
            this._message = '';
            /**
            * Args of the message for complex messages.
            */
            this._args = new Array();
            this.setMessage(message);
            this.setArgs(args);
        }
        /**
        * Returns the entire message, auto translate. Can use extra args and extra language.
        * @param args      If set, will overload the args already used by the message but not change them.
        * @param translate If true, the message will be translated using the global lang singleton instance object. TODO This doesn't work server side because lang has not been set at singleton there.
        * @param language  Allows to use another language during the translation. Else, the default user language will be used.
        * @returns {string}
        */
        MessageLang.prototype.getMessage = function (args, translate, language) {
            if (typeof args === "undefined") { args = new Array(); }
            if (typeof translate === "undefined") { translate = true; }
            if (typeof language === "undefined") { language = null; }
            // If we want to translate and the Lang singleton is available. A global lang instance of Lang/__lang must be available.
            if (typeof lang !== 'undefined' && translate) {
                if (language) {
                    return lang.get(this._message, args.length > 0 ? args : this.getArgs(), language);
                } else {
                    return lang.get(this._message, args.length > 0 ? args : this.getArgs());
                }
            } else {
                return this._message;
            }
        };

        /**
        * Change the message.
        * @param message
        */
        MessageLang.prototype.setMessage = function (message) {
            if (typeof message === "undefined") { message = ''; }
            this._message = message;
        };

        /**
        * Return the message value.
        * @returns {*}
        */
        MessageLang.prototype._getMessage = function () {
            return this._message;
        };

        /**
        * Args accessor.
        * @returns {*}
        */
        MessageLang.prototype.getArgs = function () {
            return this._args;
        };

        /**
        * Change the args.
        * @param args
        */
        MessageLang.prototype.setArgs = function (args) {
            if (typeof args === "undefined") { args = new Array(); }
            this._args = args;
        };

        /**
        * Check if the message is simple (string) or complex (object with arguments used by the Lang object).
        * @returns {boolean}
        */
        MessageLang.prototype.isComplexMessage = function () {
            // If the message contains defined args then it's a custom message. Check for both length and keys because we can get both array and object.
            return this.getArgs().length > 0 || Object.keys(this.getArgs()).length !== 0;
        };

        /**
        * Returns a custom object without method using the predefined FIELD_NAME to take less space once converted in JSON string.
        * @returns {{}}
        */
        MessageLang.prototype.toSimpleObject = function () {
            var json = {};

            if (this.isComplexMessage()) {
                json[MessageLang.FIELD_NAME_MESSAGE] = this._getMessage();
                json[MessageLang.FIELD_NAME_ARGUMENTS] = this.getArgs();
            } else {
                json = this._message;
            }

            return json;
        };

        /**
        ********************************************************
        ******************* Static methods *********************
        ********************************************************
        */
        /**
        * Create a new instance of MessageLang.
        * @param message   Error message.
        * @param args      Arguments of the message.
        * @returns {MessageLang}
        */
        MessageLang.create = function (message, args) {
            if (typeof message === "undefined") { message = ''; }
            if (typeof args === "undefined") { args = new Array(); }
            if (args) {
                return new MessageLang(message, args);
            }
            return new MessageLang(message);
        };
        MessageLang.FIELD_NAME_MESSAGE = 'm';
        MessageLang.FIELD_NAME_ARGUMENTS = 'a';
        return MessageLang;
    })();
    exports.MessageLang = MessageLang;
});
//# sourceMappingURL=MessageLang.js.map
