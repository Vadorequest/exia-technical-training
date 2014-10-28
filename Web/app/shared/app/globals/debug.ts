///<reference path='./../lib/def/defLoader.d.ts'/>

/**
 * Execute the callback if we are in dev mode or return true, can be used synch or asynch.
 * @type {function(*): undefined}
 */
dev = (function (callback: any = false): any{
    if(getPublicConfig().environment == 'development'){
        if(callback){
            callback(__config);
        }else{
            return true;
        }
    }else{
        return false;
    }
});

/**
 * Display the message with the defined console type.
 * @type {function(*, *=): undefined}
 */
devConsole = (function (message, type = 'info'){
    if(dev()){
        if(typeof sails !== 'undefined' && sails.log[type]){
            sails.log[type](message);
        }else if(console[type]){
            console[type](message)
        }else if(typeof logger !== 'undefined' && logger[type]){
            logger[type](message);
        }else{
            console.log(message);
        }
    }
});

/**
 * Alias for devConsole.
 * @type {function(*, *=): undefined|*}
 */
consoleDev = devConsole;
