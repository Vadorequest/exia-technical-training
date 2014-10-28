///<reference path="./../lib/def/defLoader.d.ts" />
define(["require", "exports"], function(require, exports) {
    /**
    * Super init, inherited by all other init classes.
    */
    var Init = (function () {
        /**
        * Run the base level initialization.
        *
        * @param config            Config object.
        * @param languages         All languages and config. Doesn't contains the texts, only config.
        * @param defaultLanguage   The entire default language.
        */
        function Init(config, languages, defaultLanguage) {
            this._init(config, languages, defaultLanguage);
        }
        /**
        * Base level initialization.
        *
        * @param config            Config object.
        * @param languages         All languages and config. Doesn't contains the texts, only config.
        * @param defaultLanguage   The entire default language.
        * @private
        */
        Init.prototype._init = function (config, languages, defaultLanguage) {
            consoleDev('Basic initialization starting...', 'debug');
            this._config = config;

            // Init the global Dao by binding the public schemas.
            this._initDao();

            // Init the global Lang, by binding the required languages.
            this._initLanguage(languages, defaultLanguage);

            consoleDev('Basic initialization done with success.', 'debug');
        };

        /**
        * Language initialization. Must be initialized in first to have error message available.
        *
        * @param languages         All languages and config. Doesn't contains the texts, only config.
        * @param defaultLanguage   The entire default language.
        * @private
        */
        Init.prototype._initLanguage = function (languages, defaultLanguage) {
            consoleDev('Language initialization starting...', 'debug');

            // Create the singleton instance for the client.
            window['lang'] = new __lang(this._config, languages, defaultLanguage, __message);
            consoleDev('Language initialization done with success!', 'debug');
        };

        /**
        * Initialize the global DAO by binding into its cache the public schemas.
        * @private
        */
        Init.prototype._initDao = function () {
            consoleDev('Dao initialization starting...', 'debug');
            if (typeof this._config._schemas !== 'undefined' && typeof __Dao !== 'undefined') {
                for (var name in this._config._schemas) {
                    __Dao.addSchemaInCache(name, this._config._schemas[name]);
                }
                consoleDev('Dao initialization done with success!', 'debug');
            } else {
                consoleDev('Unable to initialize the global Dao!', 'error');
                consoleDev('Schemas:', 'debug');
                consoleDev(this._config._schemas, 'debug');
                consoleDev('Dao:', 'debug');
                consoleDev(__Dao, 'debug');
            }
        };
        return Init;
    })();
    exports.Init = Init;
});
//# sourceMappingURL=Init.js.map
