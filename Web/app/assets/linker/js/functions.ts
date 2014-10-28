///<reference path='./lib/def/defLoader.d.ts'/>

/**
 * Return the public config.
 *
 * TODO This code should move somewhere else and be injected only on the good page.
 * @type {function(): exports.exports.paths.public|*|config}
 */
window['getPublicConfig'] = (function(){
    return __config.public ? __config.public : __config;
});

