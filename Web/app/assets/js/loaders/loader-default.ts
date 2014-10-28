///<reference path='../../js/lib/def/defLoader.d.ts' />

/**
 * Store the config in a global var to get access when we want.
 * paths    List of the files to load. (Cannot contains references TS classes)
 *              key: New reference name of the file.
 *              path: Relative path to /public/js/loaders/ of the file.
 *
 * shim     Config about the libraries (dependencies and more).
 *          See http://requirejs.org/docs/api.html#config-shim
 */
var _requireJs: any = {
    config : {
        baseUrl: '/js/loaders',
        urlArgs: "t=" + (new Date()).getTime(),
        callback: function(){
            /*
             A function to execute after deps have been loaded. Useful when require is defined as a config object before require.js is loaded,
             and you want to specify a function to require after the configuration's deps array has been loaded.
             */
            console.debug('All dependencies are loaded.');
        },
        waitSeconds: 30,// Timeout to load a script.
        paths: {
            /*
             ******** Load primary libraries (1) ********
             */

            // Lib - requireJs (addons: http://requirejs.org/docs/download.html#domReady)
            'domReady': '../lib/domReady',
            'text': '../lib/text',
            'markdown': '../lib/markdown',

            // Lib - Validator.
            'validator-extended': '../lib/validator-extended',

            /*
             ******** Load languages ********
             */
            'languages': '../../languages/languages',
            'defaultLanguage': '../../languages/'+__config.defaultLanguage,

            /*
             ******** Load shared source code ********
             */
            'Lang': '../shared/Lang.min',
            'MessageLang': '../shared/MessageLang.min',
            'Message': '../shared/Message.min',
            'ValidatorMessage': '../shared/ValidatorMessage.min',
            'Format': '../shared/Format.min',
            'Dao': '../shared/DaoPublic.min',
            'Validator': '../shared/Validator.min',
            'TranslateValidator': '../shared/TranslateValidator.min',
            'View': '../shared/View.min',

            /*
             ******** NOT IMPORTED - USED AS PATH ********
             */
            // Not imported here, useful to be able to load other scripts without know the real path.
            'baseLanguage': '../../languages'
        },
        shim: {
            'languages': {
                exports: 'text!languages.json',
                deps: ["text"]
            },
            'defaultLanguage': {
                deps: ["text", "text!languages.json"]
            },
            'Lang': {
                deps: ["text!languages.json", "text!defaultLanguage.json", "markdown", "Message"]// Need Message to base the communication and markdown to format messages.
            },
            'MessageLang': {
                deps: []
            },
            'Message': {
                deps: ["MessageLang"]
            },
            'ValidatorMessage': {
                deps: ["Message"]
            },
            'Format': {
                deps: ["Message"]
            },
            'Dao': {
                deps: []
            },
            'Validator': {
                deps: ["Message", "ValidatorMessage", "validator-extended", "Format", "Dao"]
            },
            'TranslateValidator': {
                deps: ["Validator", "Dao"]
            }
        }
    }
};

// Apply the config.
requirejs.config(_requireJs.config);

/**
 * [] Array of name that should be the same than those defined in the config.paths. Exception for the TS classes with reference in this file.
 */
requirejs(
    [
        'validator-extended',
        'text!languages.json', 'text!defaultLanguage.json',
        'Lang', 'MessageLang', 'Message', 'ValidatorMessage', 'Format', 'Dao', 'Validator', 'TranslateValidator', 'View',
        'InitDefault',
        'domReady', 'text', "markdown",
    ],
    (
        _validatorExtended,
        _languages, _defaultLanguage,
        _lang, _messageLang, _message, _validatorMessage, _format, _Dao, _validator, _translateValidator, _view,
        _init,
        _domReady, _text, _markdown
    )
    // All the previous variables will be accessible here, all these scripts are loaded!
    => {
        // Export all the common classes, common to all loaders.
        Loader.export(_lang, _messageLang, _message, _validatorMessage, _format, _Dao, _validatorExtended, _translateValidator, _view);

        // Initialization.
        var init = new _init.InitDefault(__config, _languages, _defaultLanguage);
    }
);
