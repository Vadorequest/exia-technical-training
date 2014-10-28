///<reference path='./../lib/def/defLoader.d.ts'/>

/**
 * Static class to format response client & server.
 */
export class Format{

    /**
     * Return the message as object using the Message shared communication class.
     * @param       message Message to display.
     * @param       data Data useful for callback, can be anything.
     * @param       status Status of the message.
     * @returns     {Object} See Message.js
     * @requires    message.js
     *
     * @example     With res:
                         return res.json(format.response('Message to display', {results: 50}, true));// Will return an object with 3 properties
                         return res.json(format.response(false, {}, true));// Will return an object with 1 property
                         return res.json(format.response(false, false, true));// Will return an object with 1 property
     */
    public static response(message: any, data: any, status: boolean): Message{
        if(message && message.isCustomMessage){
            // Avoid transforming message to another message when it's already a message. (Wouldn't be readable)
            return message.toObject();
        }else{
            return new __message(message, data, status).toObject();
        }
    }

    /**
     * Return the message a string (serialized) using the Message shared communication class.
     * @param       message Message to display.
     * @param       data Data useful for callback, can be anything.
     * @param       status Status of the message.
     * @returns     {string} JSON serialized string. (JSON.stringify)
     * @requires    message.js
     */
    public static responseJSON(message: any, data: any, status: boolean): Message{
        if(message && message.isCustomMessage){
            // Avoid transforming message to another message when it's already a message. (Wouldn't be readable)
            return message.toJSON();
        }else{
            return new __message(message, data, status).toJSON();
        }
    }
}