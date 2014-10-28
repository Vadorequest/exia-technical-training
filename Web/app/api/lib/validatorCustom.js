/**
 * ValidatorCustom
 *
 * @module		:: ValidatorCustom
 * @description	:: Contains helper for validation. Contains custom validations.
 * @requires    :: Validator https://github.com/chriso/node-validator
 */

/**
 * Get the shared validator, that inherits of our custom validator-extended external module.
 */
var validatorCustom = require('./../../shared/app/validator');

/**
 * ********************************************************************************
 * ********************************** User model **********************************
 * ********************************************************************************
 */

/**
 * Default comportment for Login field.
 * @param       value {string}
 * @returns     {{value: *, key: string, rules: Array}}
 */
validatorCustom.rulesUserLogin = function(value){
    var minLength = __Dao.getSchema('user').login.check.minLength;
    var maxLength = __Dao.getSchema('user').login.check.maxLength;
    var key = 'login';

    return {
        value: value,
        key: key,
        model: true,
        rules: [{
            function: 'notEmpty',
            message: '__2'
        },{
            function: 'matches',
            args: ['^[a-zA-Z0-9_-]{'+minLength+','+maxLength+'}$', 'i'],
            message: {
                "m": "__1",
                "a": ['__34', 'a-z, A-Z, 0-9,_-']
            }
        },{
            function: 'isLength',
            args: [minLength, maxLength],
            message: {
                "m": "__12",
                "a": ['__34', minLength, maxLength]
            }
        }]
    };
};

/**
 * Default comportment for email field.
 * @param       value {string}
 * @returns     {{value: *, key: string, rules: Array}}
 */
validatorCustom.rulesUserEmail = function(value){
    var minLength = __Dao.getSchema('user').email.check.minLength;
    var maxLength = __Dao.getSchema('user').email.check.maxLength;
    var key = 'email';

    return {
        value: value,
        key: key,// Must be the key in the Model.
        model: true,
        rules: [{
            function: 'notEmpty',
            message: {
                "m": "__33",
                "a": ['__39']
            }
        },{
            function: 'isLength',
            args: [minLength, maxLength],
            message: {
                "m": "__27",
                "a": [minLength, maxLength]
            }
        },{
            function: 'isEmail',
            message: '__32'
        }]
    };
};

/**
 * Default comportment for password field.
 * @param       value {string}
 * @returns     {{value: *, key: string, rules: Array}}
 */
validatorCustom.rulesUserPasswordProtected = function(value){
    var length = __Dao.getSchema('user').passwordProtected.check.length;
    var key = 'password';

    return {
        value: value,
        key: key,// Must be the key in the Model.
        model: true,
        rules: [{
            function: 'notEmpty',
            message: '__8'
        },{
            function: 'isLength',
            args: [length, length],
            message: {
                "m": "__12",
                "a": ['__40', length, length]
            }
        }]
    };
};


/**
 * Exports the custom validator.
 */
module.exports = {
    validatorCustom: validatorCustom
};