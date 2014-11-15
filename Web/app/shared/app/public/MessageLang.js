///<reference path='./../lib/def/defLoader.d.ts'/>
define(["require", "exports"], function (require, exports) {
    /**
     * @name MessageLang
     * @description Language message content class.
     * @author Vadorequest
     */
    var MessageLang = (function () {
        /**
         * Constructor for simple messages.
         *
         * @param message   Error message.
         * @param variables Variables of the message.
         */
        function MessageLang(message, variables) {
            if (message === void 0) { message = ''; }
            if (variables === void 0) { variables = new Array(); }
            /**
             * Error message, contains the message or the message code.
             */
            this._message = '';
            /**
             * Variables used by the message, for complex messages only.
             * These variables are contained inside the message itself using a very specific format, see the files containing languages.
             */
            this._variables = new Array();
            this.setMessage(message);
            this.setVariables(variables);
        }
        /**
         * Returns the entire message, auto translate. Can use extra args and extra language. TODO Translate doesn't work server side because lang has not been set at singleton there.
         *
         * @param variables If set, will overload the variables by merging these variables with the variables already contained in the message but will not modify them, just use them this time.
         * @param options   Contains options, such as the language to use, if markdown should be applied and so on.
         * @returns {string}
         */
        MessageLang.prototype.getMessage = function (options, variables) {
            if (options === void 0) { options = {}; }
            if (variables === void 0) { variables = false; }
            // Translate by default.
            if (typeof options.translate === 'undefined') {
                options.translate = true;
            }
            // If we want to translate and the if the "Lang" singleton is available. A global lang instance of Lang/__lang must be available.
            if (typeof lang !== 'undefined' && options.translate) {
                return lang.get(this._message, options, variables ? _.merge(this.getVariables(), variables) : this.getVariables());
            }
            else {
                return this._message;
            }
        };
        /**
         * Change the message.
         * @param message
         */
        MessageLang.prototype.setMessage = function (message) {
            if (message === void 0) { message = ''; }
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
         * Variables accessor.
         * @returns {*}
         */
        MessageLang.prototype.getVariables = function () {
            return this._variables;
        };
        /**
         * Set the variables.
         * @param variables
         */
        MessageLang.prototype.setVariables = function (variables) {
            if (variables === void 0) { variables = new Array(); }
            this._variables = variables;
        };
        /**
         * Check if the message is simple (string) or complex (object with arguments used by the Lang object).
         * @returns {boolean}
         */
        MessageLang.prototype.isComplexMessage = function () {
            // If the message contains defined args then it's a custom message. Check for both length and keys because we can get both array and object.
            return this.getVariables().length > 0 || Object.keys(this.getVariables()).length !== 0;
        };
        /**
         * Returns a custom object without method using the predefined FIELD_NAME to take less space once converted in JSON string.
         * @returns {{}}
         */
        MessageLang.prototype.toSimpleObject = function () {
            var json = {};
            if (this.isComplexMessage()) {
                json[MessageLang.FIELD_NAME_MESSAGE] = this._getMessage();
                json[MessageLang.FIELD_NAME_ARGUMENTS] = this.getVariables();
            }
            else {
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
         *
         * @param message   Error message.
         * @param args      Arguments of the message.
         * @returns {MessageLang}
         */
        MessageLang.create = function (message, args) {
            if (message === void 0) { message = ''; }
            if (args === void 0) { args = new Array(); }
            if (args) {
                return new MessageLang(message, args);
            }
            return new MessageLang(message);
        };
        /**
         * Constants.
         */
        MessageLang.FIELD_NAME_MESSAGE = 'm';
        MessageLang.FIELD_NAME_ARGUMENTS = 'a';
        return MessageLang;
    })();
    exports.MessageLang = MessageLang;
});
//# sourceMappingURL=MessageLang.js.map