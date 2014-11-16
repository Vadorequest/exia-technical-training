///<reference path='./lib/def/defLoader.d.ts'/>
/**
 * Return the public config.
 *
 * TODO This code should move somewhere else and be injected only on the good page.
 * @type {function(): exports.exports.paths.public|*|config}
 */
window['getPublicConfig'] = (function () {
    return __config.public ? __config.public : __config;
});
/**
 * Check if a variable is set or not.
 * @type {function(any): boolean}
 * TODO Move this into "_"
 */
window['isSet'] = (function (variable) {
    return typeof variable !== 'undefined';
});
//# sourceMappingURL=functions.js.map