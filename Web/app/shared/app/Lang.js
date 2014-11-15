///<reference path='./lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './public/Lang'], function (require, exports, _lang) {
    /**
     * Manage all the languages server side.
     */
    var Lang = (function (_super) {
        __extends(Lang, _super);
        /**
         * Basically run the init method.
         * @param config            The public server config.
         * @param languages         The public JSON languages config file.
         * @param defaultLanguage   The public JSON language text file to use as default an main language.
         */
        function Lang(config, languages, defaultLanguage) {
            _super.call(this, config, languages, defaultLanguage, false);
        }
        /**
         * Load all languages.
         * Must be called once the global "lang" singleton has been set.
         * We must use fs.readFileSynch instead of node require if we want to specify the file extension, because the file is loaded using requireJs and we use absolute path.
         *
         * @param force             If true, then will reload the loaded languages sentences.
         * @param reloadLanguages   If true, then will reload the language configuration file that contains languages.
         */
        Lang.prototype.loadAllLanguages = function (force, reloadLanguages) {
            if (force === void 0) { force = false; }
            if (reloadLanguages === void 0) { reloadLanguages = false; }
            // Load the file that contains all language configuration.
            var pathLanguages = __config.path.base + __config.path.languages;
            var languages = reloadLanguages ? require(pathLanguages + 'languages') : this._languages;
            _.each(languages, function (language) {
                // If we force reload or if the language hasn't been added yet.
                if (!this._languageIsSet(language.min) || force) {
                    // Load the language file and add it to the global singleton lang instance.
                    this.addLanguage(language.min, require(pathLanguages + language.min), force, function (message) {
                        console.log(message.getMessage());
                    });
                }
            }, this);
        };
        return Lang;
    })(_lang.Lang);
    exports.Lang = Lang;
});
//# sourceMappingURL=Lang.js.map