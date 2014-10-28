///<reference path='./../../lib/def/defLoader.d.ts'/>

/**
 * Cache files provided by the game application through HTTP.
 * Execute a request, check if there is any different file and get files from the game if so.
 * Copy all cached files in the /shared folder, use configuration file to know which files must be cached.
 * It is possible to overload the configuration in the child itself, by changing the variables in the class.
 * Variables here and config file will be merged to cache the files.
 *
 * This class is located on the game to share it easily with all children application.
 */
export class CoreCache {
    /**
     * If the host is not available, then it will be set to false.
     * Use to display error messages due to the not available host only once.
     *
     * @type {boolean}
     */
    private static host_available: boolean = true;

    /**
     * Allowed file extensions to get from the host.
     *
     * @type {string[]}
     * @private
     */
    private static _extensions: string[] = ['ts', 'js', 'json'];

    /**
     * List of the shared config files to get.
     *
     * @type {string[]}
     */
    public static _sharedConfigFiles: string[] = [];

    /**
     * List of the shared lib files to get.
     *
     * @type {string[]}
     */
    public static _sharedLibFiles: string[] = [];

    /**
     * List of the shared core controller files to get.
     *
     * @type {string[]}
     */
    public static _sharedCoreControllersFiles: string[] = [];

    /**
     * List of the shared core lib files to get.
     *
     * @type {string[]}
     */
    public static _sharedCoreLibFiles: string[] = [];

    /**
     * List of the shared model files to get.
     *
     * @type {string[]}
     */
    public static _sharedCoreModelsFiles: string[] = [];

    /**
     * List of the shared core service files to get.
     *
     * @type {string[]}
     */
    public static _sharedCoreServicesFiles: string[] = [];

    /**
     * List of the shared typescript definition files to get.
     *
     * @type {string[]}
     */
    public static _sharedDefFiles: string[] = [];

    /**
     * List of the shared global files to get.
     *
     * @type {string[]}
     */
    public static _sharedGlobalsFiles: string[] = [];

    /**
     * List of the shared public files to get.
     *
     * @type {string[]}
     */
    public static _sharedPublicFiles: string[] = [];

    /**
     * Determine if we should do the cache or not to avoid infinite loop using automatic server reload on file change.
     *
     * @returns {boolean}
     * @private
     */
    private static _shouldDoCache(): boolean{
        var filename = __config.cache.lastCacheTimestampFile;
        if(fs.existsSync(__config.path.base + filename)){
            var oldTimestamp: number = parseInt(fs.readFileSync(__config.path.base + filename, 'utf8'));
            var newTimestamp: number = new Date().getTime();
            var timeKeepCache = __config.cache.secBeforeReloadCache * 1000;
            if(oldTimestamp + timeKeepCache > newTimestamp){
                consoleDev('Cache NON reloaded because the previous cache regeneration was too close. Remaining time: '+ (Math.abs(newTimestamp - oldTimestamp - timeKeepCache) / 1000));
                return false;
            }else{
                return true;
            }
        }else{
            return true;
        }
    }

    /**
     * Update the timestamp value into the .tmp dir.
     *
     * @param callback  Callback to execute once the file is written.
     * @private
     */
    private static _cacheDone(callback?: any): void{
        var filename = __config.cache.lastCacheTimestampFile;
        var dirpath = path.resolve(__config.path.base, path.dirname(filename));

        // Ensure the path exists with mkdirp, if it doesn't, create all missing folders.
        mkdirp(dirpath, function(err){
            if (err){
                consoleDev('Unable to create the directories "' + dirpath + '" in' + __filename + ' at ' + __line + '\n' + err.message, 'error');
            }else{
                fs.writeFile(__config.path.base + filename, new Date().getTime(), function(err) {
                    if (err){
                        consoleDev('Unable to write the new cache timestamp in ' + filename + ' from ' + __filename + ' at ' + __line + '\n' + err.message, 'error');
                    }else{
                        consoleDev('Cache process done!');
                    }

                    callback ? callback() : '';
                });
            }
        });
    }

    /**
     * Cache a single file from the host response.
     *
     * @param fileResponse          Host response.
     * @param relativePathFromBase  Relative path from the base directory.
     * @param callback              Callback to execute if the file is cached.
     * @private
     */
    private static _cacheFile(fileResponse: any, relativePathFromBase: string, callback?: any): void{
        var file = fileResponse.filename;
        var ext;

        // Detect the file extension received.
        for(var j in CoreCache._extensions){
            var _ext = CoreCache._extensions[j];
            if(fileResponse[_ext] !== false){
                ext = _ext;
            }
        }

        var filePath = __config.path.base + relativePathFromBase + fileResponse.filename + '.' + ext;

        // Check if the cached file is different from the file we got.
        if(fs.existsSync(filePath)){
            var cachedFileContent: any = fs.readFileSync(filePath).toString('utf8');
        }else{
            var cachedFileContent: any = false;
        }

        if(cachedFileContent !== fileResponse[ext]){
            fs.writeFile(filePath, fileResponse[ext], function(){
                callback ? callback() : '';
            });
            consoleDev('===> Cached updated for "' + relativePathFromBase + file + '".' + ext, 'warn');
        }else{
            consoleDev('Cached non updated for "' + relativePathFromBase + file + '".' + ext + '. [Identical]', 'verbose');
        }
    }

    /**
     * Process a HTTP request to the host to cache a group of files.
     * Display error only if the host in not already set as not available.
     *
     * @param files                 Files to process.
     * @param controller            Controller to call in the host.
     * @param method                Method to call in the controller.
     * @param relativePathFromBase  Relative path from the base directory.
     * @param callback              Callback to execute if the file is cached.
     * @private
     */
    private static _cacheFiles(files: string[], controller: string, method: string, relativePathFromBase: string, callback?: any){
        for(var i in files){
            var file = files[i];

            // If the host is still reachable.
            if(CoreCache.host_available){
                __request.send(controller, method, {'file': file}, {},
                    /* Success callback */
                    function (message, response) {
                        if(message.getStatus()){
                            CoreCache._cacheFile(message.getData(), relativePathFromBase, function(){
                                callback ? callback() : '';
                            });
                        }else{
                            consoleDev('/!!!\\ ===> The file ' + relativePathFromBase + file + ' was not found on Game server: ' + message.getMessage(), 'warn');
                            consoleDev('/!!!\\ ===> ' + JSON.stringify(message.getData()), 'warn');
                        }
                    },
                    /* Error callback */
                    function(error: any, response: any, message: any, options: any){
                        // Display error server side.
                        if(error && error.code == __request.CONNECTION_REFUSED){
                            // Display the message only once. TODO This solution is not the best, all requests are sent, even if only one message is displayed, this is due to the fact that all requests are sent even before the first response is received.
                            if(CoreCache.host_available){
                                consoleDev('Game server not running, caching aborted.', 'warn');
                            }
                            CoreCache.host_available = false;
                        } else {
                            consoleDev(response, 'warn');
                        }
                    });
                consoleDev('Request sent to get the file "' + relativePathFromBase + file + '".', 'verbose');
            }
        }
    }

    /*********************************************************************
     ************************* Public ************************************
     *********************************************************************/

    /**
     * Will cache all files to cache based on the local configuration.
     *
     * @param callback  Callback to execute once the cache is done.
     */
    public static cacheFilesFromGameServer(callback: any){
        // Check if we should generate the cache.
        if(CoreCache._shouldDoCache()){
            // Merge the cache config (inherited from the game) and the class config. (That can be customized in the child app by extending the CoreCache class)
            CoreCache._cacheFiles(_.union(__config.cache.files.config, CoreCache._sharedConfigFiles),                       'file', 'config', 'shared/config/');
            CoreCache._cacheFiles(_.union(__config.cache.files.libs, CoreCache._sharedLibFiles),                            'file', 'lib', 'shared/app/');
            CoreCache._cacheFiles(_.union(__config.cache.files.core_controllers, CoreCache._sharedCoreControllersFiles),    'file', 'coreControllers', 'shared/app/core/controllers/');
            CoreCache._cacheFiles(_.union(__config.cache.files.core_libs, CoreCache._sharedCoreLibFiles),                   'file', 'coreLib', 'shared/app/core/lib/');
            CoreCache._cacheFiles(_.union(__config.cache.files.core_models, CoreCache._sharedCoreModelsFiles),              'file', 'coreModels', 'shared/app/core/models/');
            CoreCache._cacheFiles(_.union(__config.cache.files.core_services, CoreCache._sharedCoreServicesFiles),          'file', 'coreServices', 'shared/app/core/services/');
            CoreCache._cacheFiles(_.union(__config.cache.files.typescript_def, CoreCache._sharedDefFiles),                  'file', 'def', 'shared/app/lib/def/');
            CoreCache._cacheFiles(_.union(__config.cache.files.globals, CoreCache._sharedGlobalsFiles),                     'file', 'global', 'shared/app/globals/');
            CoreCache._cacheFiles(_.union(__config.cache.files.public, CoreCache._sharedPublicFiles),                       'file', 'public', 'shared/app/public/');

            // To avoid infinite caching loop, just update the timestamp in the file.
            CoreCache._cacheDone(function(){
                // Start the server.
                callback();
            });
        }else{
            // Start the server.
            callback();
        }
    }
}