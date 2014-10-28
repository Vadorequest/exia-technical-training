///<reference path='./def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var cache = require('./../../shared/app/core/lib/CoreCache');

/**
* Cache files provided by the game application through HTTP.
* Execute a request, check if there is any different file and get files from the game if so.
* Copy all cached files in the /shared folder, use configuration file to know which files must be cached.
* It is possible to overload the configuration in the child itself, by changing the variables in the class.
* Variables here and config file will be merged to cache the files.
*
* This class is located on the game to share it easily with all children application.
*
* @author  Ambroise Dhenain
*/
var Cache = (function (_super) {
    __extends(Cache, _super);
    function Cache() {
        _super.apply(this, arguments);
    }
    Cache._sharedConfigFiles = [];

    Cache._sharedLibFiles = [];

    Cache._sharedCoreControllersFiles = [];

    Cache._sharedCoreLibFiles = [];

    Cache._sharedCoreModelsFiles = [];

    Cache._sharedCoreServicesFiles = [];

    Cache._sharedDefFiles = [];

    Cache._sharedGlobalsFiles = [];

    Cache._sharedPublicFiles = [];
    return Cache;
})(cache.CoreCache);
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map
