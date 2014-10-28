///<reference path='./lib/def/defLoader.d.ts'/>

/**
 * Class using request module to send HTTP requests. Default configuration to reach Game server webservice.
 */
export class Request {
    /**
     * Connection refused by host, usually because the host isn't available.
     * @type {string}
     */
    public static CONNECTION_REFUSED = 'ECONNREFUSED';

    /**
     * Default executed method when an error is catch.
     * @param error - Error object, if happened, but basically if this method is called it's because there is an error.
     * @param response - Server response. (Big!)
     * @param message - Server response message.
     * @param options - Options object that will be send to the callback (success/error), allows to provides variables. Basically used to send the Response object.
     * @private
     */
    private static _defaultError(error: any, response: any, message: any, options: any): void{
        // If the response object is provided then returns automatically a response instead of just display an error.
        if(options.res){
            var res = options.res;
            if(error && error.code == Request.CONNECTION_REFUSED){
                res.json(new __message('Game server not running, connexion aborted.', {message: message}));
            }else{
                res.json(new __message('Unknown error.', {message: message}));
            }
        }

        // Display error server side.
        if(error && error.code == Request.CONNECTION_REFUSED){
            consoleDev('Game server not running, connexion aborted.', 'warn');
            consoleDev(error, 'warn');
        } else {
            consoleDev(response, 'warn');
        }
    }

    /**
     * Send a request.
     * @param controller - Controller name.
     * @param method - Method name.
     * @param data - Data, object containing {key1 => value1, key2 => value2}.
     * @param options - Options object that will be send to the callback (success/error), allows to provides variables. Basically used to send the Response object.
     * @param success - Method to execute on success. (=> Message, response)
     * @param error - Method to execute on error. [Use by default the _defaultError method]
     * @param httpMethod - HTTP method to use. [POST]
     * @param application - Application config to use in the global config object. [game]
     * @param service - Service config to use in the global config object. [webservice]
     */
    public static send(controller: string, method: string, data: any = {}, options: any = {}, success?: (message: any, response: any, options: any) => any, error: any = Request._defaultError, httpMethod: string = 'post', application: string = 'game', service: string = 'webservice'): void{
        if(!error){
            error = Request._defaultError;
        }

        try{
            var serviceConfig = __config[application][service];
        }catch(e){
            consoleDev('Unable to load the requested service configuration.', 'error');
        }

        // request is a global object from the request node module.
        var _request: any = request[httpMethod.toLowerCase()](serviceConfig.url + ':' + serviceConfig.port + '/' + controller + '/' + method, function(err, response, message){
            if(!err && response.statusCode && response.statusCode == 200){
                // Successful request, convert message and callback with success.
                message = __message.create(message);
                success(message, response, options);

            }else{
                error(err, response, message, options);
            }
        });

        /**
         * Bind data, once it's done, the request will be executed.
         */
        var requestFormData: any = _request.form();
        // Bind data.
        for(var key in data){
            requestFormData.append(key, data[key]);
        }
    }
}