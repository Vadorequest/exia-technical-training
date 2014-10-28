///<reference path='./../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './Validator'], function(require, exports, _validator) {
    /**
    *
    */
    var TranslateValidator = (function (_super) {
        __extends(TranslateValidator, _super);
        function TranslateValidator() {
            _super.apply(this, arguments);
        }
        /**
        * ********************************************************************************
        * ********************************** User model **********************************
        * ********************************************************************************
        */
        /**
        * Default comportment for Login field.
        *
        * @param       value
        * @param       key
        * @returns     {{value: *, key: string, rules: Array}}
        */
        TranslateValidator.rulesUserLogin = function (value, key) {
            if (typeof key === "undefined") { key = 'login'; }
            var minLength = __Dao.getSchema('user').login.check.minLength;
            var maxLength = __Dao.getSchema('user').login.check.maxLength;

            return {
                value: value,
                key: key,
                model: true,
                rules: [
                    {
                        function: 'notEmpty',
                        message: '__2'
                    }, {
                        function: 'matches',
                        args: ['^[a-zA-Z0-9_-]{' + minLength + ',' + maxLength + '}$', 'i'],
                        message: {
                            "m": "__1",
                            "a": {
                                field: '__34',
                                characters: 'a-z, A-Z, 0-9,_-'
                            }
                        }
                    }, {
                        function: 'isLength',
                        args: [minLength, maxLength],
                        message: {
                            "m": "__12",
                            "a": {
                                field: '__34',
                                min: minLength,
                                max: maxLength
                            }
                        }
                    }]
            };
        };

        /**
        * Default comportment for email field.
        *
        * @param       value   Value.
        * @param       key     Key where is stored the value in the object once the validation is passed.
        * @param       model   If true then the key will be put inside the keysModelChecked object.
        * @returns     {{value: *, key: string, rules: Array}}
        */
        TranslateValidator.rulesUserEmail = function (value, key, model) {
            if (typeof key === "undefined") { key = 'email'; }
            if (typeof model === "undefined") { model = true; }
            var minLength = __Dao.getSchema('user').email.check.minLength;
            var maxLength = __Dao.getSchema('user').email.check.maxLength;

            return {
                value: value,
                key: key,
                model: model ? model : false,
                rules: [
                    {
                        function: 'notEmpty',
                        message: {
                            "m": "__33",
                            "a": {
                                field: '__39'
                            }
                        }
                    }, {
                        function: 'isLength',
                        args: [minLength, maxLength],
                        message: {
                            "m": "__27",
                            "a": {
                                min: minLength,
                                max: maxLength
                            }
                        }
                    }, {
                        function: 'isEmail',
                        message: {
                            "m": "__32",
                            "a": {
                                field: '__39'
                            }
                        }
                    }]
            };
        };

        /**
        * Default comportment for protected password field.
        * This field is sent from the client but hs been hashed before to go through the network.
        *
        * @param       value   Value.
        * @param       key     Key where is stored the value in the object once the validation is passed.
        * @param       model   If true then the key will be put inside the keysModelChecked object.
        * @returns     {{value: *, key: string, rules: Array}}
        */
        TranslateValidator.rulesUserPasswordProtected = function (value, key, model) {
            if (typeof key === "undefined") { key = 'password'; }
            if (typeof model === "undefined") { model = true; }
            var length = __Dao.getSchema('user').passwordProtected.check.length;

            return {
                value: value,
                key: key,
                model: model ? model : false,
                rules: [
                    {
                        function: 'notEmpty',
                        message: '__8'
                    }, {
                        function: 'isLength',
                        args: [length, length],
                        message: {
                            "m": "__12",
                            "a": {
                                field: '__40',
                                min: length,
                                max: length
                            }
                        }
                    }]
            };
        };

        /**
        * Default comportment for the public password field.
        * That's the password the user fill in the form.
        *
        * @param       value   Value.
        * @param       key     Key where is stored the value in the object once the validation is passed.
        * @param       model   If true then the key will be put inside the keysModelChecked object.
        * @returns     {{value: *, key: string, rules: Array}}
        */
        TranslateValidator.rulesUserPasswordPublic = function (value, key, model) {
            if (typeof key === "undefined") { key = 'password'; }
            if (typeof model === "undefined") { model = true; }
            var minLength = __Dao.getSchema('user').passwordPublic.check.minLength;
            var maxLength = __Dao.getSchema('user').passwordPublic.check.maxLength;

            return {
                value: value,
                key: key,
                model: model ? model : false,
                rules: [
                    {
                        function: 'notEmpty',
                        message: '__8'
                    }, {
                        function: 'isLength',
                        args: [minLength, maxLength],
                        message: {
                            "m": "__12",
                            "a": {
                                field: '__40',
                                min: minLength,
                                max: maxLength
                            }
                        }
                    }]
            };
        };
        return TranslateValidator;
    })(_validator.Validator);
    exports.TranslateValidator = TranslateValidator;
});
//# sourceMappingURL=TranslateValidator.js.map
