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
    /**
     * List of the shared config files to get.
     *
     * @type {string[]}
     */
    Cache._sharedConfigFiles = [];
    /**
     * List of the shared lib files to get.
     *
     * @type {string[]}
     */
    Cache._sharedLibFiles = [];
    /**
     * List of the shared core controller files to get.
     *
     * @type {string[]}
     */
    Cache._sharedCoreControllersFiles = [];
    /**
     * List of the shared core lib files to get.
     *
     * @type {string[]}
     */
    Cache._sharedCoreLibFiles = [];
    /**
     * List of the shared model files to get.
     *
     * @type {string[]}
     */
    Cache._sharedCoreModelsFiles = [];
    /**
     * List of the shared core service files to get.
     *
     * @type {string[]}
     */
    Cache._sharedCoreServicesFiles = [];
    /**
     * List of the shared typescript definition files to get.
     *
     * @type {string[]}
     */
    Cache._sharedDefFiles = [];
    /**
     * List of the shared global files to get.
     *
     * @type {string[]}
     */
    Cache._sharedGlobalsFiles = [];
    /**
     * List of the shared public files to get.
     *
     * @type {string[]}
     */
    Cache._sharedPublicFiles = [];
    return Cache;
})(cache.CoreCache);
exports.Cache = Cache;
//# sourceMappingURL=Cache.js.map