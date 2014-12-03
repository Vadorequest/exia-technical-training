///<reference path="./../lib/def/defLoader.d.ts" />
/**
 * Execute the callback if we are in dev mode or return true, can be used synch or asynch.
 * @type {function(*): undefined}
 */
window['dev'] = (function (callback) {
    if (callback === void 0) { callback = null; }
    if (getPublicConfig().environment == 'development') {
        if (callback) {
            callback(config);
        }
        else {
            return true;
        }
    }
});
/**
 * Display the message with the defined console type.
 * @type {function(*, *=): undefined}
 */
window['devConsole'] = (function (message, type) {
    if (type === void 0) { type = 'warn'; }
    if (getPublicConfig().environment == 'development') {
        if (console[type]) {
            console[type](message);
        }
        else {
            console.log(message);
        }
    }
});
/**
 * Alias for devConsole() function.
 * @type {*}
 */
window['consoleDev'] = window['devConsole'];
//# sourceMappingURL=debug.js.map