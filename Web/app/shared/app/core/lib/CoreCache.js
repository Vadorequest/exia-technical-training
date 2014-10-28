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
var CoreCache = (function () {
    function CoreCache() {
    }
    /**
    * Determine if we should do the cache or not to avoid infinite loop using automatic server reload on file change.
    *
    * @returns {boolean}
    * @private
    */
    CoreCache._shouldDoCache = function () {
        var filename = __config.cache.lastCacheTimestampFile;
        if (fs.existsSync(__config.path.base + filename)) {
            var oldTimestamp = parseInt(fs.readFileSync(__config.path.base + filename, 'utf8'));
            var newTimestamp = new Date().getTime();
            var timeKeepCache = __config.cache.secBeforeReloadCache * 1000;
            if (oldTimestamp + timeKeepCache > newTimestamp) {
                consoleDev('Cache NON reloaded because the previous cache regeneration was too close. Remaining time: ' + (Math.abs(newTimestamp - oldTimestamp - timeKeepCache) / 1000));
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    };

    /**
    * Update the timestamp value into the .tmp dir.
    *
    * @param callback  Callback to execute once the file is written.
    * @private
    */
    CoreCache._cacheDone = function (callback) {
        var filename = __config.cache.lastCacheTimestampFile;
        var dirpath = path.resolve(__config.path.base, path.dirname(filename));

        // Ensure the path exists with mkdirp, if it doesn't, create all missing folders.
        mkdirp(dirpath, function (err) {
            if (err) {
                consoleDev('Unable to create the directories "' + dirpath + '" in' + __filename + ' at ' + __line + '\n' + err.message, 'error');
            } else {
                fs.writeFile(__config.path.base + filename, new Date().getTime(), function (err) {
                    if (err) {
                        consoleDev('Unable to write the new cache timestamp in ' + filename + ' from ' + __filename + ' at ' + __line + '\n' + err.message, 'error');
                    } else {
                        consoleDev('Cache process done!');
                    }

                    callback ? callback() : '';
                });
            }
        });
    };

    /**
    * Cache a single file from the host response.
    *
    * @param fileResponse          Host response.
    * @param relativePathFromBase  Relative path from the base directory.
    * @param callback              Callback to execute if the file is cached.
    * @private
    */
    CoreCache._cacheFile = function (fileResponse, relativePathFromBase, callback) {
        var file = fileResponse.filename;
        var ext;

        for (var j in CoreCache._extensions) {
            var _ext = CoreCache._extensions[j];
            if (fileResponse[_ext] !== false) {
                ext = _ext;
            }
        }

        var filePath = __config.path.base + relativePathFromBase + fileResponse.filename + '.' + ext;

        // Check if the cached file is different from the file we got.
        if (fs.existsSync(filePath)) {
            var cachedFileContent = fs.readFileSync(filePath).toString('utf8');
        } else {
            var cachedFileContent = false;
        }

        if (cachedFileContent !== fileResponse[ext]) {
            fs.writeFile(filePath, fileResponse[ext], function () {
                callback ? callback() : '';
            });
            consoleDev('===> Cached updated for "' + relativePathFromBase + file + '".' + ext, 'warn');
        } else {
            consoleDev('Cached non updated for "' + relativePathFromBase + file + '".' + ext + '. [Identical]', 'verbose');
        }
    };

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
    CoreCache._cacheFiles = function (files, controller, method, relativePathFromBase, callback) {
        for (var i in files) {
            var file = files[i];

            // If the host is still reachable.
            if (CoreCache.host_available) {
                __request.send(controller, method, { 'file': file }, {}, function (message, response) {
                    if (message.getStatus()) {
                        CoreCache._cacheFile(message.getData(), relativePathFromBase, function () {
                            callback ? callback() : '';
                        });
                    } else {
                        consoleDev('/!!!\\ ===> The file ' + relativePathFromBase + file + ' was not found on Game server: ' + message.getMessage(), 'warn');
                        consoleDev('/!!!\\ ===> ' + JSON.stringify(message.getData()), 'warn');
                    }
                }, function (error, response, message, options) {
                    // Display error server side.
                    if (error && error.code == __request.CONNECTION_REFUSED) {
                        // Display the message only once. TODO This solution is not the best, all requests are sent, even if only one message is displayed, this is due to the fact that all requests are sent even before the first response is received.
                        if (CoreCache.host_available) {
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
    };

    /*********************************************************************
    ************************* Public ************************************
    *********************************************************************/
    /**
    * Will cache all files to cache based on the local configuration.
    *
    * @param callback  Callback to execute once the cache is done.
    */
    CoreCache.cacheFilesFromGameServer = function (callback) {
        // Check if we should generate the cache.
        if (CoreCache._shouldDoCache()) {
            // Merge the cache config (inherited from the game) and the class config. (That can be customized in the child app by extending the CoreCache class)
            CoreCache._cacheFiles(_.union(__config.cache.files.config, CoreCache._sharedConfigFiles), 'file', 'config', 'shared/config/');
            CoreCache._cacheFiles(_.union(__config.cache.files.libs, CoreCache._sharedLibFiles), 'file', 'lib', 'shared/app/');
            CoreCache._cacheFiles(_.union(__config.cache.files.core_controllers, CoreCache._sharedCoreControllersFiles), 'file', 'coreControllers', 'shared/app/core/controllers/');
            CoreCache._cacheFiles(_.union(__config.cache.files.core_libs, CoreCache._sharedCoreLibFiles), 'file', 'coreLib', 'shared/app/core/lib/');
            CoreCache._cacheFiles(_.union(__config.cache.files.core_models, CoreCache._sharedCoreModelsFiles), 'file', 'coreModels', 'shared/app/core/models/');
            CoreCache._cacheFiles(_.union(__config.cache.files.core_services, CoreCache._sharedCoreServicesFiles), 'file', 'coreServices', 'shared/app/core/services/');
            CoreCache._cacheFiles(_.union(__config.cache.files.typescript_def, CoreCache._sharedDefFiles), 'file', 'def', 'shared/app/lib/def/');
            CoreCache._cacheFiles(_.union(__config.cache.files.globals, CoreCache._sharedGlobalsFiles), 'file', 'global', 'shared/app/globals/');
            CoreCache._cacheFiles(_.union(__config.cache.files.public, CoreCache._sharedPublicFiles), 'file', 'public', 'shared/app/public/');

            // To avoid infinite caching loop, just update the timestamp in the file.
            CoreCache._cacheDone(function () {
                // Start the server.
                callback();
            });
        } else {
            // Start the server.
            callback();
        }
    };
    CoreCache.host_available = true;

    CoreCache._extensions = ['ts', 'js', 'json'];

    CoreCache._sharedConfigFiles = [];

    CoreCache._sharedLibFiles = [];

    CoreCache._sharedCoreControllersFiles = [];

    CoreCache._sharedCoreLibFiles = [];

    CoreCache._sharedCoreModelsFiles = [];

    CoreCache._sharedCoreServicesFiles = [];

    CoreCache._sharedDefFiles = [];

    CoreCache._sharedGlobalsFiles = [];

    CoreCache._sharedPublicFiles = [];
    return CoreCache;
})();
exports.CoreCache = CoreCache;
//# sourceMappingURL=CoreCache.js.map
