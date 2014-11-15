///<reference path='./../lib/def/defLoader.d.ts'/>

import message = require('./Message');
import messageLang = require('./MessageLang');

/**
 * @name ValidatorMessage
 * @description Message object for both server and client side communication.
 * @author Vadorequest
 */
export class ValidatorMessage extends message.Message implements message.IMessage{

    /**
     * Constants overloaded.
     */
    public static FIELD_NAME_ERRORS: string = 'e';

    /**
     * Constants.
     */
    public static TYPE_MESSAGE: string = 'v';

    /**
     * Instance variables overloaded.
     * _message Is not used by this class. Need an array of messages that are actually ValidatorErrorMessageLang instances.
     */
    public _typeMessage: string = ValidatorMessage.TYPE_MESSAGE;

    /**
     * Contains all errors. Is contained in message.data.
     * Contains array of ValidatorErrorMessageLang objects.
     */
    public _errors: any;

    /**
     * Constructor.
     *
     * @param errors    String, ValidatorErrorMessageLang or array of errors.
     * @param data      Data useful for callback, can be anything.
     * @param status    Status of the message.
     */
    constructor(errors: any = new Array(), data: any = {}, status: boolean = true){
        // Create a _message variable but won't be used actually.
        super('', data, status, ValidatorMessage.FIELD_NAME_TYPE_MESSAGE);

        // Protect export against bad data such as false or null. (Need an object even empty!)
        if(!this._data){
            this._data = {};
        }

        this._errors = new Array();
        if(typeof errors === 'string'){
            // Simple error with just a message. Create a custom error.
            this._errors.push(new ValidatorErrorMessageLang(errors));
        }else if(errors instanceof ValidatorErrorMessageLang){
            // Complex error, just push it.
            this._errors.push(errors);
        }else if(errors instanceof Array){
            // Array of errors.
            for(var error in errors){
                var message = errors[error][ValidatorErrorMessageLang.FIELD_NAME_MESSAGE];
                var args = errors[error][ValidatorErrorMessageLang.FIELD_NAME_ARGUMENTS];
                var key = errors[error][ValidatorErrorMessageLang.FIELD_NAME_KEY];

                if(typeof message === 'object'){
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
     *
     * @param message   Error message. Can be string if simple message of object if complex message with variable arguments.
     * @param key       Key of the error. {pseudo, email, etc.}
     * @param args      Args of the message.
     */
    public addError(message: string, key: string = '', args: any = new Array()): ValidatorMessage{
        if(message){
            this._errors.push(new ValidatorErrorMessageLang(message, args, key));
            this._status = false;
        }else{
            consoleDev("ValidatorMessage.addError: Unable to add a ValidatorErrorMessageLang object into the array of errors. (Field empty) \nmessage:" + message);
        }

        return this;
    }

    /**
     * Check if there is at least one error or if the status was explicitly set to false.
     * @returns {boolean}
     */
    public getStatus(): boolean{
        return (!(this._errors.length > 0) && this._status);
    }

    /**
     * Returns all errors by default, can return an error using its index in the array.
     * If the index is provided then the returned value will be a Message instance, otherwise it will be an array of Message.
     * The methods can return either Message or MessageLang instances, by default it will return Message instances.
     *
     * @param index                 Index of the error to get. Returns all by default.
     * @param returnMessageInstance If true then returns the whole instance if only one error is returned, returns an array of MessageLang otherwise.
     * @returns {*[]}
     */
    public getErrors(index: number = null, returnMessageInstance: boolean = true): any{
        if(!this.getStatus()){
            if(typeof index === 'undefined' || index === null){
                // Returns all errors.
                return returnMessageInstance ?
                    // Return Message instances.
                    _.map(this._errors, function(validatorMessage: ValidatorMessage){
                        return new message.Message(validatorMessage, this._data, this._status);
                    }, this):

                    // Return MessageLang instances.
                    _.map(this._errors, function(validatorMessage: ValidatorMessage){
                        return validatorMessage._message;
                    }, this);

            }else if(this._errors[index]){
                // Returns the message only.
                return returnMessageInstance ? new message.Message(this._errors[index], this._data, this._status) : this._message;
            }
        }

        return false;
    }

    /**
     * Count the number of errors.
     * @return {number}
     */
    public countErrors(): number{
        return typeof this._errors !== 'undefined' ? this._errors.length : 0;
    }

    /**
     * Returns the first error of the errors list.
     * Helper for Message compatibility.
     *
     * @param options   Contains options, such as the language to use, if markdown should be applied and so on.
     * @param variables If set, will overload the variables by merging these variables with the variables already contained in the message but will not modify them, just use them this time.
     * @returns {string}
     */
    public getMessage(options: any = {}, variables: any = false): string{
        return this._getFirstError().getMessage(options, variables);
    }

    /**
     * Returns all messages, concatenated.
     *
     * @param options   Contains options, such as the language to use, if markdown should be applied and so on.
     * @param variables If set, will overload the variables by merging these variables with the variables already contained in the message but will not modify them, just use them this time.
     * @param separator Separator to use between sentences.
     * @return {string}
     */
    public getAllMessages(options: any = {}, variables: any = false, separator: string = ''): string{
        var msg = '';
        _.map(this._errors, function(validatorMessage: ValidatorMessage){
            msg += validatorMessage.getMessage(options, variables) + separator;
        });

        return msg;
    }

    /**
     * Returns the first error of the errors list.
     * @returns {*}
     */
    public _getFirstError(): ValidatorErrorMessageLang{
        // Check if there is at least an error.
        return !this.getStatus() && this._errors.length > 0 ? this._errors[0] : false;
    }

    /**
     * Returns a custom object without method using the predefined FIELD_NAME to take less space once converted in JSON string.
     *
     * @returns {{}}
     * @private
     */
    public _toSimpleObject(): any{
        var json  = {};
        // Don't export the message, it's useless.
        //json[ValidatorMessage.FIELD_NAME_MESSAGE] = this._message;

        // If we got data or errors to export.
        if(this._data !== false || !this.getStatus() ){
            // Export data anyway because errors are inside.
            json[ValidatorMessage.FIELD_NAME_DATA] = this._data;

            // If there is at least one error, export the errors.
            if(!this.getStatus()){
                json[ValidatorMessage.FIELD_NAME_DATA][ValidatorMessage.FIELD_NAME_ERRORS] = new Array();

                // Convert as object for each error.
                for(var error in this._errors){
                    json[ValidatorMessage.FIELD_NAME_DATA][ValidatorMessage.FIELD_NAME_ERRORS].push(this._errors[error].toSimpleObject());
                }
            }
        }
        json[ValidatorMessage.FIELD_NAME_STATUS] = this._status;
        json[ValidatorMessage.FIELD_NAME_TYPE_MESSAGE] = this._typeMessage;

        return json;
    }

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
    public static create(json): message.IMessage{
        // Convert json to object.
        return ValidatorMessage.fromJSON(json);
    }

    /**
     * Convert JSON to a ValidatorMessage object instance.
     *
     * @param json  Json to convert to object.
     * @returns {Message}
     */
    public static fromJSON(json): message.IMessage{
        if(typeof json === 'object'){
            return ValidatorMessage._fromJSONObject(json);
        }else if(typeof json === 'string'){
            return ValidatorMessage._fromJSONString(json);
        }else{
            throw "ValidatorMessage.fromJSON " + message.Message.EXCEPTION_BAD_JSON_TYPE;
        }
    }

    /**
     * Convert JSON object to a ValidatorMessage object instance.
     *
     * @param json  Json to convert to object.
     * @returns {ValidatorMessage}
     * @private
     */
    public static _fromJSONObject(json: JSON): any{
        if(json[ValidatorMessage.FIELD_NAME_DATA]){
            return new ValidatorMessage(json[ValidatorMessage.FIELD_NAME_DATA][ValidatorMessage.FIELD_NAME_ERRORS], json[ValidatorMessage.FIELD_NAME_DATA], json[ValidatorMessage.FIELD_NAME_STATUS]);
        }else{
            return new ValidatorMessage(new Array(), {}, json[ValidatorMessage.FIELD_NAME_STATUS]);
        }
    }

    /**
     * Convert JSON string to a ValidatorMessage object instance.
     *
     * @param json  Json to convert to object.
     * @returns {ValidatorMessage}
     * @private
     */
    public static _fromJSONString(json: string): message.IMessage{
        return ValidatorMessage._fromJSONObject(JSON.parse(json));
    }
}

/**
 * @name ValidatorErrorMessageLang
 * @description Validator error class, based on MessageLang class.
 * @author Vadorequest
 *
 * This class is used only by this file, nowhere else. So it makes sense and makes things easier to just have it here.
 */
export class ValidatorErrorMessageLang extends messageLang.MessageLang{
    /**
     * Constants.
     */
    public static FIELD_NAME_KEY: string = 'k';
    public static FIELD_NAME_SUB_MESSAGE: string = messageLang.MessageLang.FIELD_NAME_MESSAGE;
    public static FIELD_NAME_SUB_ARGUMENTS: string = messageLang.MessageLang.FIELD_NAME_ARGUMENTS;

    /**
     * Error key.
     */
    private _key: string = '';

    /**
     * Constructor.
     *
     * @param key       Key of the error. {pseudo, email, etc.}
     * @param args      Arguments of the error. Used only for complex errors.
     * @param message   Error message. Can be string if simple message of object if complex message with variable arguments.
     */
    constructor(message: string = '', args: any = new Array(), key: string = ''){
        super(message, args);
        this._key = key;

        // Avoid to have an object into message because of the MessageLang constructor, just need a string.
        if(typeof this._message !== 'string'){
            this._message = this._message[messageLang.MessageLang.FIELD_NAME_MESSAGE];
        }
    }

    /**
     * Returns the key of the validation error message.
     * @returns {string}
     */
    public getKey(): string{
        return this._key;
    }

    /**
     * Returns a custom object without method using the predefined FIELD_NAME to take less space once converted in JSON string.
     * @returns {{}}
     */
    public toSimpleObject(): any{
        var json  = {};
        json[ValidatorErrorMessageLang.FIELD_NAME_KEY] = this._key;

        if(this.isComplexMessage()){
            json[ValidatorErrorMessageLang.FIELD_NAME_MESSAGE] = {};
            json[ValidatorErrorMessageLang.FIELD_NAME_MESSAGE][ValidatorErrorMessageLang.FIELD_NAME_SUB_MESSAGE] = this._message;
            json[ValidatorErrorMessageLang.FIELD_NAME_MESSAGE][ValidatorErrorMessageLang.FIELD_NAME_SUB_ARGUMENTS] = this._variables;
        }else{
            json[ValidatorErrorMessageLang.FIELD_NAME_MESSAGE] = this._message
        }

        return json;
    }
}