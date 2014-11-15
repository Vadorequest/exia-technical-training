///<reference path='./../lib/def/defLoader.d.ts'/>
define(["require", "exports"], function (require, exports) {
    /**
     * This class is used by both client and server sides.
     * It's also shared with external application and acts as a CoreValidator but because we need to make it public for the client,
     * we can't put it inside the core.
     *
     * Server side, the validator global doesn't exists, but it does in the client side. (see validator-extended lib)
     */
    var Validator = (function () {
        function Validator() {
        }
        /**
         * Check an entire object using Validator module.
         *
         * @param       params {Object|Array} Rules to checks. If required doesn't exists then params is used like the required array. (
                             required {Array} Contains all arrays of rules which are REQUIRED and must not be empty or null.
                             optional {Array} Contains all arrays of rules which are OPTIONAL and can be empty or null. One of them array is described below: (Use the same array than the [required] field)
                                 value {*} The value to check.
                                 key {string} The key in the model. If you don't want to link the field to a model, set it to FALSE. (Can be used for group errors on the same field too)
                                 rules {Array} Array of Objects:
                                     function {string} Function to execute. See https://github.com/chriso/node-validator for the entire list.
                                     message {string} Message to send if one error appends on this rule.
                                     args {Array} Array of values which contains all parameters. Useful only for methods which need parameters like len, regex, min, max, etc.
         * @param       callback {Function} Function to execute after validation, if you don't then the script will return the validation object.
         * @param       res {Result object} If res is provides and if at least one error appends then an automatic response will be send using res.json method. If it doesn't you have to manage error message return by your own.
         *                  If used from the client side then this is a callback.
         * @returns     {{errors: {messages: Array, status: boolean}, typeError: 'V', keysModelChecked: {}, keysChecked: {}}} Return or data passed in the callback:
                             errors {Array}
                                messages {Array} Contains an array of all errors found.
                                     key {string|false} Key of the error, could be one key of the database model. (Useful for dynamic create/update)
                                     message {string} Message to display.
                                status {boolean} If true, at least one error occurred.
                             keysModelChecked {Object} Contains [key: value] which belong to a model and were checked.
                             keysChecked {Object} Contains all [key: value] other checked keys.
    
         * @author      Vadorequest
         *
         * @example     Callback and res provided
                             __validator.check([
                                 __validator.rulesUserEmail(req.params.email),
                                 __validator.rulesUserPasswordProtected(req.params.password)
                             ], function(errors, keysModelChecked, keysChecked){
                                // Do what you want, it's secure because if error appends there will be automatic response. (res provided and auto return if it error occurred)
                            }, res);
    
         * @example     Callback and res don't provided
                             __validator.check([
                                 __validator.rulesUserEmail(req.params.email),
                                 __validator.rulesUserPasswordProtected(req.params.password)
                             ], function(errors, keysModelChecked, keysChecked){
                                // You have to check for errors by your own.
                                if(errors.status){
                                    // No error occurred.
                                }else{
                                    // Error occurred.
                                }
                            });
    
         * @example     No callback - You shouldn't use this way
                             var validation = __validator.check([
                                 __validator.rulesUserEmail(req.params.email),
                                 __validator.rulesUserPasswordProtected(req.params.password)
                             ]);
    
         * @example     Use optional field check with res provided
                            __validator.check({
                                required: [
                                    __validator.rulesUserSessionId(req.session.user.id)
                                ],
                                optional: [
                                    __validator.rulesUserEmail(req.param('email')),
                                    __validator.rulesUserPasswordProtected(req.param('password'))
                                ]
                            }, function(errors, keysModelChecked, keysChecked){
                                // No error occurred. (res provided and auto return if it error occurred)
                                // keysModelChecked will contains password and email, but only if they wasn't null or empty.
                                // You can use [!_.isEmpty(keysModelChecked)] for be sure at least one value was passed.
                                // You can use [_.mergeAttributesToModel(model, keysModelChecked)] for merge the keysModelChecked with a model dynamically without check for each field if you have to update it.
                            }, res);
         */
        Validator.check = function (params, callback, res) {
            // Contains params checked with values, useful for insert/update queries.
            var keysModelChecked = {};
            // Contains all other non model keys checked.
            var keysChecked = {};
            // Contains only params to check.
            var paramsToCheck = params.required ? params.required : params;
            // Add not null params to paramsToCheck if wanted.
            if (params.optional) {
                for (var i = 0; i < params.optional.length; i++) {
                    // If the value is not null or undefined
                    if (params.optional[i].value && params.optional[i].value != null && params.optional[i].value != undefined) {
                        paramsToCheck.push(params.optional[i]);
                    }
                }
            }
            // Errors handler.
            var validatorMessage = new __validatorMessage();
            for (var i = 0; i < paramsToCheck.length; i++) {
                var value = paramsToCheck[i].value;
                var key = (paramsToCheck[i].key !== false ? (paramsToCheck[i].key ? paramsToCheck[i].key : 'undefined' + i) : false); // If false, keep false, else try to get the defined value, if no one then create a dynamic key.
                var rule = paramsToCheck[i].rules;
                var model = paramsToCheck[i].model;
                for (var j = 0; j < rule.length; j++) {
                    try {
                        // Get the function from the object.
                        var fct = validator[rule[j].function];
                        // Apply parameters if exist.
                        if (rule[j].args) {
                            // Convert the value to array to concat both arrays.
                            var valueArr = [value];
                            var args = valueArr.concat(rule[j].args);
                            // Check if the called function exists.
                            if (fct) {
                                // Exists, check, will return a boolean.
                                var result = fct.apply(value, args);
                            }
                            else {
                                throw {
                                    message: 'Unable to find the function validator.' + fct + '().',
                                    key: key
                                };
                            }
                        }
                        else {
                            // Just call the function.
                            var result = validator[rule[j].function](value);
                        }
                        // Something is wrong, throw exception that will return the predefined message.
                        if (!result) {
                            throw {
                                message: rule[j].message,
                                key: key
                            };
                        }
                    }
                    catch (e) {
                        // When an exception is raise that means there is a validation error. (Or real exception!)
                        validatorMessage.addError(e.message ? e.message : e, key, (rule[j].message.a ? rule[j].message.a : rule[j].args)); // Returns in priority the args of the message, but if not found then returns the args.
                    }
                }
                // Add the key=>value to the keys that belong to a model.
                if (key !== false && model === true) {
                    keysModelChecked[key] = value;
                }
                else if (key !== false) {
                    // Add the key=>value to the other keys, that don't belong to a model.
                    keysChecked[key] = value;
                }
            }
            // If res is provided, callback has to be call and if an error appends then we don't do it! Use res for send a response with errors.
            if (res && !validatorMessage.getStatus() && callback) {
                if (__config.target == 'server') {
                    // Server side then res is an instance of express.Response.
                    res.json(__format.response(validatorMessage));
                }
                else {
                    // Client side it's an error callback.
                    res(validatorMessage);
                }
            }
            else {
                // Bind the data into the validatorMessage anyway.
                validatorMessage.addData('keysModelChecked', keysModelChecked);
                validatorMessage.addData('keysChecked', keysChecked);
                // Do callback or return results.
                if (callback) {
                    // Send also the keys avoid a request on the validatorMessage each time to get them.
                    callback(validatorMessage, keysModelChecked, keysChecked);
                }
                else {
                    return validatorMessage;
                }
            }
        };
        /**
         * ********************************************************************************
         * ********************************* Default rules ********************************
         * ********************************************************************************
         */
        /**
         * Default rules for a Resource name.
         *
         * @param       value       Resource name.
         * @param       key         Key where is stored the value in the object once the validation is passed.
         * @param       minLength   Minimum length required.
         * @param       maxLength   Maximum length required.
         * @param       model       If true then the key will be put inside the keysModelChecked object.
         * @returns {{value: *, key: string, model: boolean, rules: *[]}}
         */
        Validator.rulesFolderName = function (value, key, minLength, maxLength, model) {
            if (key === void 0) { key = 'folderName'; }
            if (minLength === void 0) { minLength = getPublicConfig().validator.folder.minLength; }
            if (maxLength === void 0) { maxLength = getPublicConfig().validator.folder.maxLength; }
            if (model === void 0) { model = false; }
            return {
                value: value,
                key: key,
                model: model ? model : false,
                rules: [{
                    function: 'notEmpty',
                    message: '__25'
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
                    function: 'matches',
                    args: ['^[a-zA-Z0-9 _-]{' + minLength + ',' + maxLength + '}$', 'i'],
                    message: '__26'
                }]
            };
        };
        /**
         * Default rules for a Resource name.
         *
         * @param       value       Resource name.
         * @param       key         Key where is stored the value in the object once the validation is passed.
         * @param       minLength   Minimum length required.
         * @param       maxLength   Maximum length required.
         * @param       model       If true then the key will be put inside the keysModelChecked object.
         * @returns {{value: *, key: string, model: boolean, rules: *[]}}
         */
        Validator.rulesResourceName = function (value, key, minLength, maxLength, model) {
            if (key === void 0) { key = 'resourceName'; }
            if (minLength === void 0) { minLength = getPublicConfig().validator.resource.minLength; }
            if (maxLength === void 0) { maxLength = getPublicConfig().validator.resource.maxLength; }
            if (model === void 0) { model = false; }
            return {
                value: value,
                key: key,
                model: model ? model : false,
                rules: [{
                    function: 'notEmpty',
                    message: '__25'
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
                    function: 'matches',
                    args: ['^[a-zA-Z0-9 _-]{' + minLength + ',' + maxLength + '}$', 'i'],
                    message: '__26'
                }]
            };
        };
        /**
         * Default rules for a filename.
         *
         * @param       value       File name.
         * @param       key         Key where is stored the value in the object once the validation is passed.
         * @param       model       If true then the key will be put inside the keysModelChecked object.
         * @param       minLength   Minimum length required.
         * @param       maxLength   Maximum length required.
         * @returns {{value: *, key: string, model: boolean, rules: *[]}}
         */
        Validator.rulesFilename = function (value, key, minLength, maxLength, model) {
            if (key === void 0) { key = 'filename'; }
            if (minLength === void 0) { minLength = getPublicConfig().validator.filename.minLength; }
            if (maxLength === void 0) { maxLength = getPublicConfig().validator.filename.maxLength; }
            if (model === void 0) { model = false; }
            return {
                value: value,
                key: key,
                model: model ? model : false,
                rules: [{
                    function: 'notEmpty',
                    message: '__25'
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
                    function: 'matches',
                    args: ['^[a-zA-Z0-9 ._-]', 'i'],
                    message: '__26'
                }]
            };
        };
        /**
         * ********************************************************************************
         * ********************************** Models **************************************
         * ********************************************************************************
         */
        /**
         * Default comportment for user session ID.
         *
         * @param       value Value.
         * @returns     {{value: *, key: *, rules: Array}}
         */
        Validator.rulesUserSessionId = function (value) {
            return {
                value: value,
                key: 'userSessionId',
                model: false,
                rules: [{
                    function: 'notEmpty',
                    message: '__38'
                }]
            };
        };
        /**
         * Default comportment for Database auto-generated ID field.
         *
         * @param       value       Value.
         * @param       key         Key where is stored the value in the object once the validation is passed.
         * @param       message     Custom message to display instead of the default.
         * @param       minLength   Minimum length required.
         * @param       maxLength   Maximum length required.
         * @returns     {{value: *, key: string, rules: Array}}
         */
        Validator.rulesId = function (value, key, message, minLength, maxLength) {
            if (key === void 0) { key = null; }
            if (message === void 0) { message = null; }
            if (minLength === void 0) { minLength = getPublicConfig().validator.mongoDbId.minLength; }
            if (maxLength === void 0) { maxLength = getPublicConfig().validator.mongoDbId.maxLength; }
            return {
                value: value,
                key: key ? key : false,
                model: true,
                rules: [{
                    function: 'notEmpty',
                    message: message ? message : '__28'
                }, {
                    function: 'isLength',
                    args: [minLength, maxLength],
                    message: {
                        "m": "__13",
                        "a": {
                            field: '__37',
                            min: minLength,
                            max: maxLength
                        }
                    }
                }]
            };
        };
        /**
         * Default comportment for Database auto-query limit field.
         *
         * @param       value {int}
         * @returns     {{value: *, key: *, rules: Array}}
         */
        Validator.rulesLimit = function (value, min) {
            if (min === void 0) { min = getPublicConfig().validator.limit.minLength; }
            return {
                value: value,
                key: 'limit',
                model: true,
                rules: [{
                    function: 'isInt',
                    message: {
                        "m": "__29",
                        "a": {
                            field: '__35',
                            type: '__36'
                        }
                    }
                }, {
                    function: 'min',
                    args: [min],
                    message: {
                        "m": "__30",
                        "a": {
                            field: '__34',
                            value: min
                        }
                    }
                }]
            };
        };
        /**
         * Useful in some cases to add a field in the keysModelChecked object without any real check.
         *
         * @param       value   Value.
         * @param       key     Key where is stored the value in the object once the validation is passed.
         * @param       model   If true then the key will be put inside the keysModelChecked object.
         * @returns     {{value: *, key: *, rules: Array}}
         */
        Validator.rulesEmpty = function (value, key, model) {
            if (key === void 0) { key = false; }
            if (model === void 0) { model = false; }
            return {
                value: value,
                key: key ? key : false,
                model: model ? model : false,
                rules: []
            };
        };
        /**
         * Check that two strings/numbers are equals.
         *
         * @param       value           Value.
         * @param       confirmation    Confirmation value.
         * @param       key             Key where is stored the value in the object once the validation is passed.
         * @param       model           If true then the key will be put inside the keysModelChecked object.
         * @returns     {{value: *, key: *, rules: Array}}
         */
        Validator.rulesEquals = function (value, confirmation, key, model) {
            if (key === void 0) { key = 'password'; }
            if (model === void 0) { model = false; }
            return {
                value: value,
                key: key ? key : false,
                model: model ? model : false,
                rules: [{
                    function: 'equals',
                    args: [confirmation],
                    message: {
                        "m": "__41",
                        "a": {
                            field: key // TODO Reverse engineering to find the key with the value based on the english language.
                        }
                    }
                }]
            };
        };
        /**
         * Default rules for any name.
         * Can read into a defined model to get the minLength and maxLength values using the "modelName" parameter.
         *
         * @param       value       Name.
         * @param       modelName   If provided then will take priority on the min/max length values to read the values inside the model.
         * @param       key         Key where is stored the value in the object once the validation is passed.
         * @param       minLength   Minimum length required.
         * @param       maxLength   Maximum length required.
         * @param       model       If true then the key will be put inside the keysModelChecked object.
         * @returns {{value: *, key: string, model: boolean, rules: *[]}}
         */
        Validator.rulesName = function (value, modelName, key, minLength, maxLength, model) {
            if (modelName === void 0) { modelName = null; }
            if (key === void 0) { key = 'name'; }
            if (minLength === void 0) { minLength = 0; }
            if (maxLength === void 0) { maxLength = 100; }
            if (model === void 0) { model = true; }
            // If we provided a modelName to look into to get the default values then we try to access to it.
            if (modelName !== null) {
                // If the model does exist we override the values.
                var _model = __Dao.getSchema(modelName);
                if (_model && _model[key]) {
                    minLength = _model[key].check.minLength;
                    maxLength = _model[key].check.maxLength;
                }
                else {
                    consoleDev('The validator rule "rulesName" could not look into the model called "' + modelName + '.' + key + '" because it or its field does not exist.');
                }
            }
            return {
                value: value,
                key: key,
                model: model ? model : false,
                rules: [{
                    function: 'notEmpty',
                    message: '__25'
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
                    function: 'matches',
                    args: ['^[a-zA-Z0-9 _-]{' + minLength + ',' + maxLength + '}$', 'i'],
                    message: '__26'
                }]
            };
        };
        /**
         * Rule for all languages code. The same rules apply for all applications. (Game, Translate, ...)
         *
         * @param       value       Name.
         * @param       key         Key where is stored the value in the object once the validation is passed.
         * @param       minLength   Minimum length required.
         * @param       maxLength   Maximum length required.
         * @param       model       If true then the key will be put inside the keysModelChecked object. [true]
         * @returns {{value: *, key: string, model: boolean, rules: *[]}}
         */
        Validator.rulesLanguageCode = function (value, key, minLength, maxLength, model) {
            if (key === void 0) { key = 'code'; }
            if (minLength === void 0) { minLength = getPublicConfig().validator.languageCode.minLength; }
            if (maxLength === void 0) { maxLength = getPublicConfig().validator.languageCode.maxLength; }
            if (model === void 0) { model = true; }
            return {
                value: value,
                key: key,
                model: model ? model : false,
                rules: [{
                    function: 'notEmpty',
                    message: '__25'
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
                    function: 'matches',
                    args: ['^[a-zA-Z0-9 _-]{' + minLength + ',' + maxLength + '}$', 'i'],
                    message: '__26'
                }]
            };
        };
        return Validator;
    })();
    exports.Validator = Validator;
});
//# sourceMappingURL=Validator.js.map