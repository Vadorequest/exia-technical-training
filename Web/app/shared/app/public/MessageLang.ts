///<reference path='./../lib/def/defLoader.d.ts'/>

/**
 * @name MessageLang
 * @description Language message content class.
 * @author Vadorequest
 */
export class MessageLang{

    /**
     * Constants.
     */
    public static FIELD_NAME_MESSAGE = 'm';
    public static FIELD_NAME_ARGUMENTS = 'a';

    /**
     * Error message, contains the message or the message code.
     */
    public _message: any = '';

    /**
     * Variables used by the message, for complex messages only.
     * These variables are contained inside the message itself using a very specific format, see the files containing languages.
     */
    public _variables: any = new Array();

    /**
     * Constructor for simple messages.
     *
     * @param message   Error message.
     * @param variables Variables of the message.
     */
    constructor(message: string = '', variables: any = new Array()){
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
    public getMessage(options: any = {}, variables: any = false): string{
        // Translate by default.
        if(typeof options.translate === 'undefined'){
            options.translate = true;
        }

        // If we want to translate and the if the "Lang" singleton is available. A global lang instance of Lang/__lang must be available.
        if(typeof lang !== 'undefined' && options.translate){
            return lang.get(this._message, options, variables ? _.merge(this.getVariables(), variables) : this.getVariables());
        }else{
            return this._message;
        }
    }

    /**
     * Change the message.
     * @param message
     */
    public setMessage(message: string = ''){
        this._message = message;
    }

    /**
     * Return the message value.
     * @returns {*}
     */
    public _getMessage(): any{
        return this._message;
    }

    /**
     * Variables accessor.
     * @returns {*}
     */
    public getVariables(): Array<any>{
        return this._variables;
    }

    /**
     * Set the variables.
     * @param variables
     */
    public setVariables(variables: any = new Array()){
        this._variables = variables;
    }

    /**
     * Check if the message is simple (string) or complex (object with arguments used by the Lang object).
     * @returns {boolean}
     */
    public isComplexMessage(): boolean{
        // If the message contains defined args then it's a custom message. Check for both length and keys because we can get both array and object.
        return this.getVariables().length > 0 || Object.keys(this.getVariables()).length !== 0;
    }

    /**
     * Returns a custom object without method using the predefined FIELD_NAME to take less space once converted in JSON string.
     * @returns {{}}
     */
    public toSimpleObject(): any{
        var json  = {};

        if(this.isComplexMessage()){
            json[MessageLang.FIELD_NAME_MESSAGE] = this._getMessage();
            json[MessageLang.FIELD_NAME_ARGUMENTS] = this.getVariables();
        }else{
            json = this._message
        }

        return json;
    }

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
    public static create(message: string = '', args: any = new Array()): MessageLang{
        if(args){
            return new MessageLang(message, args);
        }
        return new MessageLang(message);
    }
}