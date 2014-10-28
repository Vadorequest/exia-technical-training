/**
 * configHelper
 *
 * @module      :: configHelper
 * @description :: Contains helper about configuration files.
 */
module.exports = {

    /**
     * Load and merge shared, app and local config files.
     * Priority: shared < app < local
     *
     * @param file      File name to load.
     * @param config    Config that contains the paths to use to load the file, application specific.
     * @param base      Base path to load files. Must contain a "/" at the end. [Use the global __config option]
     * @param ext       File extension. [json]
     *
     * @return object
     */
    load: function(file, config, base, ext){
        var fs = fs || require('fs');

        ext = ext ? ext : 'json';
        base = base ? base : __config.path.base;
        config = config ? config : __config.path.config;

        var shared = {};
        var app = {};
        var local = {};

        if(config.shared !== false && fs.existsSync(base + config.shared + file + '.' + ext)){
            shared = require(base + config.shared + file + '.' + ext)
        }

        if(config.app !== false && fs.existsSync(base + config.app + file + '.' + ext)){
            app = require(base + config.app + file + '.' + ext)
        }

        if(config.local !== false && fs.existsSync(base + config.local + file + '.' + ext)){
            local = require(base + config.local + file + '.' + ext)
        }

        return objectHelper.mergePriority(shared, app, local);
    },

    /**
     * Exports the config to the client.
     * Ensure to not export the private data.
     * Bind all the public schemas in the public config object.
     *
     * @param   config    Config of the whole application. Contains private config.
     * @param   dao       Data access object, usually used to retrieve the schemas and models server side, will be used here to extract the information to communicate to the client side.
     * @return  {*|string} JSON
     * */
    exportClient: function(config, path){
        var publicConfig = getPublicConfig();

        // Initialize.
        publicConfig._schemas = {};

        // Store the schema inside the config.
        _.each(publicConfig.schemas, function(schema){
            // I tried using the dao, but ... WTF, it requires the schema using requireJs and cannot load it, fuck this shit, hate it.
            publicConfig._schemas[schema] = require(path + schema + 'Schema');
        });

        return JSON.stringify(publicConfig);
    }
};