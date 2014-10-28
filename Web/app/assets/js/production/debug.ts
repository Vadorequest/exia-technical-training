declare var config;

// Disable function in production mode.
window['dev'] =
    window['devConsole'] =
        window['consoleDev'] =
            (function (){
                // Be aware there is a problem on a script and be able to track it a little in production mode.
                return false;
            });