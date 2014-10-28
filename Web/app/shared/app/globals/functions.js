///<reference path='./../lib/def/defLoader.d.ts'/>
/**
* Return the public config.
* @type {function(): exports.exports.paths.public|*|config}
*/
getPublicConfig = (function () {
    return __config.public ? __config.public : __config;
});
//# sourceMappingURL=functions.js.map
