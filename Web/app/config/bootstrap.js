/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {

    /**
     * Create all global vars using node base modules. Don't use the keyword 'var'.
     *
     * @static mongoose     Database. http://mongoosejs.com/docs/guide.html
     */
    mongoose = require('mongoose');

    /**
     * Load what is specific to these applications. (web/game/webservice)
     * @static lang         Singleton instance of the Lang class to manage languages in the application.
     * @static __validator  Validator specific to this application.
     */
    lang = new __lang(__config.public, require('./../config/locales/languages.json'), require('./../config/locales/' + __config.public.defaultLanguage + '.json'));// Singleton.
    __validator = requireJs('./public/TranslateValidator').TranslateValidator;

    /**
     * Create all global vars for our own libraries.
     * @static __cache      Manage the cached files located into the /shared folder.
     * @static __Dao        Manage the cache into the /shared folder.
     */
    __cache = require(__config.path.base + 'api/lib/Cache').Cache;
    __Dao = require(__config.path.base + 'api/lib/Dao').Dao;

    /**
     * ***************************************************************
     * ********** Auto rebuild the generated files *******************
     * ***************************************************************
     */

    if(__config.web.autoStartGrunt){
        requireJs('./Grunt').Grunt.grunt();// Relative path to /shared/app.
    }

    /**
     * ***************************************************************
     * ********************** Database Connect ***********************
     * ***************************************************************
     */
    //var mongodbConfig = require('./app/mongodb.json')[__config.public.environment];
    //mongoose.connect('mongodb://'+mongodbConfig.host+'/'+mongodbConfig.database);
    //
    //var db = mongoose.connection;
    //db.on('error', console.error.bind(console, 'connection error:'));
    //
    //db.once('open', function callback () {
    //    consoleDev('Mongoose db connection is now open from Translate.');
    //});

    /**
     * Initialize the database. Require all Models and store them in the cache.
     * Generate non existing indexes.
     */
    require('./../api/scripts/initModels');

    /**
     * Retrieve the most recent code used in the DB and store in into the memory for ulterior usage.
     * This is done only once when the app starts and use the memory while the app is running.
     */
    applicationHelper.retrieveMostRecentCode();

    /**
     * Reload the cached files from Game server.
     *
     * /!\ Disable this feature when you want to debug cached files. /!\
     */
    if(__config.cache.reloadCachedFilesFromGameOnStart){
        __cache.cacheFilesFromGameServer(function(){
            // Run sails once the cache process is done.
            cb();
        });
    }else{
        cb();
    }
};