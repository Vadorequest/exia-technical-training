/**
 * ***************************************************************
 * *********** Import GLOBAL vars available everywhere ***********
 * ***************************************************************
 */

// Application base path.
basePath = __dirname + '/../../../../';

/**
 * Require globals functions.
 *
 * debug:           Global functions to debug.
 * functions:       Global functions.
 * objectExtended:  Extends the node global instance to add debug funtions such as __line and __function to help to debug.
 */
require(basePath + 'shared/app/globals/debug');
require(basePath + 'shared/app/globals/functions');
require(basePath + 'shared/app/globals/objectExtended');
require(basePath + 'shared/app/globals/services');

/**
 * Create all global vars using node base modules. Don't use the keyword 'var'.
 *
 * @static process      Instance of EventEmitter. http://nodejs.org/api/process.html [Auto bounded]
 * @static _            Lodash, tools for collections. http://lodash.com/
 * @static async        Asynchronous control flow. https://github.com/caolan/async
 * @static crypto       Utilities to crypt password. http://nodejs.org/api/crypto.html
 * @static http         Http query object. http://nodejs.org/api/http.html
 * @static fs           File storage. http://nodejs.org/api/fs.html
 * @static os           Tools about OS. http://nodejs.org/api/os.html
 * @static path         Tools for handling and transforming file paths. http://nodejs.org/api/path.html
 * @static util         Tools. http://nodejs.org/api/util.html
 *
 * @static markdown     Markdown for format texts in HTML for the client side. https://github.com/evilstreak/markdown-js
 * @static mkdirp       Directory generator. https://github.com/substack/node-mkdirp
 * @static Q            Asynchronous promises. https://github.com/kriskowal/q
 * @static redis        Pseudo database to store non-durable data. https://github.com/mranney/node_redis
 * @static requireJs    Require for .js scripts. http://requirejs.org/
 * @static Schema       Database schema. Used in shared/schemas/
 * @static traceback    Debug utility to know where an error occurred. https://www.npmjs.org/package/traceback
 */
_ = require(basePath + 'shared/app/globals/lodashExtends')
    , async = require('async')
    , crypto = require('crypto')
    , fs = require('fs')
    , http = require('http')
    , os = require('os')
    , path = require('path')
    , util = require('util')

    // Installed packages.
    , CircularJSON = require('circular-json')// We use a non-conform name here, because it is the same in both client and server side and I prefer to keep the native one.
    , markdown = require('markdown').markdown
    , mkdirp = require('mkdirp')
    , Q = require('q')
    , redis = require('redis')
    , request = require('request')
    , requireJs = require('requirejs')
    , Schema = require('mongoose').Schema // Don't make mongoose global. Should not be used everywhere.
    , traceback = require('traceback')
    , validator = require('validator-extended').ValidatorExtended
;

// Load what is specific to this application, if specific file exists.
if(fs.existsSync(basePath + 'shared/app/private/bootstrapHelperBefore.js')){
    require('../../private/bootstrapHelperBefore')
}

/**
 * Environment global variables.
 */
__config.path.base = basePath;

// Use our own config file to set the node environment.
process.env.NODE_ENV = __config.public.environment;

/**
 * Local config about requireJs.
 * All requireJs done with this context will have their path equal to __dirname. (shared folder)
 */
requireJs.config({
    //Use node's special variable __dirname to
    //get the directory containing this file.
    //Useful if building a library that will
    //be used in node but does not require the
    //use of node outside
    baseUrl: __dirname + '/../..',

    //Pass the top-level main.js/index.js require
    //function to requirejs so that node modules
    //are loaded relative to the top-level JS file.
    nodeRequire: require
});

/**
 * Create all global vars in shared/app/public libraries.
 *
 * @static __messageLang        Message that contains data about a sentence that could be translated
 * @static __message            Message container to communicate between client and server.
 * @static __validatorMessage   Message container to communicate between client and server for validation handler.
 * @static __format             Used to format data, basically response between client and server.
 * @static __view               View library, contains mostly helpers, used client and server side.
 *
 * /!\ WARNING: The relative path here is '/', defined previously via requireJs.config, but it's true ONLY when using requireJs to load files! /!\
 */
__messageLang = requireJs('./public/MessageLang').MessageLang;
__message = requireJs('./public/Message').Message;
__validatorMessage = requireJs('./public/ValidatorMessage').ValidatorMessage;
__format = requireJs('./public/Format').Format;
__view = requireJs('./public/View').View;

/**
 * Create all global vars in shared/app libraries.
 *
 * @static __lang               Lang module for the server part.
 * @static __request            To send HTTP request, based on request module.
 *
 * /!\ WARNING: The relative path here is '/shared/app', defined previously via requireJs.config, but it's true ONLY when using requireJs to load files! /!\
 */
__lang = requireJs('./Lang').Lang;
__request = requireJs('./Request').Request;

// Load what is specific to this application, if specific file exists.
if(fs.existsSync(__config.path.base + 'shared/app/private/bootstrapHelperAfter.js')){
    require('../../private/bootstrapHelperAfter')
}

// Delete temp variable, value stored in config object.
basePath = null;