/**
 * Executed once the basic modules and libraries have ben loaded.
 * Must set a global __config object.
 */
__config = configHelper.load('_serverConfig', require(basePath + 'config/app/_serverConfig.json').path.config, basePath);
__config.public = configHelper.load('serverConfig', require(basePath + 'config/app/_serverConfig.json').path.config, basePath);