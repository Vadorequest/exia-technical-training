// Special case where we need to require these helpers to merge all config files. It's not running in the same instance as the application.
configHelper = require('./../api/services/configHelper');

// ObjectHelper is used internally by the configHelper.
objectHelper = require('./../api/services/objectHelper');

module.exports = function(){

    /**
     * Load our config.
     * It is usually available through `__config` but not in the grunt tasks because our application is not started in this context. So we need to require it manually.
     */
    return configHelper.load('serverConfig', require('./../config/app/_serverConfig.json').path.config, __dirname + '/../');
};