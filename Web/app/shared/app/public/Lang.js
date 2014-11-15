///<reference path='./../lib/def/defLoader.d.ts'/>
define(["require", "exports"], function (require, exports) {
    /**
     * Manage all the languages client side.
     * TODO Use the default language when the sentence is not found in the custom language, if the custom isn't the default.
     * The purpose is to always display something to the user, even if it's not the good language.
     */
    var Lang = (function () {
        /**
         * Basically run the init method.
         *
         * @param serverConfig      The public server config.
         * @param languages         The public JSON languages config file.
         * @param defaultLanguage   The public JSON language text file to use as default an main language.
         * @param parse             Indicates if whether or not the language config file should be parsed or not.
         * @param callback          Eventual callback to execute once the initialization is done.
         */
        function Lang(serverConfig, languages, defaultLanguage, parse, callback) {
            if (parse === void 0) { parse = true; }
            /**
             * Field where store the content of each language.
             */
            this._FIELD_CONTENT_LANG = 'text';
            /**
             * Special field token. Must be included in all config language file to determine the language.
             */
            this._FIELD_KEY_LANG = '__lang__';
            /**
             * Constants.
             */
            this.FIELD_NAME_MESSAGE = 'm';
            this.FIELD_NAME_ARGS = 'a';
            this.PATTERN_ARGS = '$';
            // The default path are basically used only server side.
            var serverConfig = serverConfig || require('./../../config/serverConfig.json');
            var languages = languages || require('./../../app/public/languages/languages.json');
            var defaultLanguage = defaultLanguage || require('./../../app/public/languages/' + serverConfig.defaultLanguage + '.json');
            this._parse = parse;
            this._initialize(serverConfig, languages, defaultLanguage, callback);
        }
        /**
         * Add a language to the languages used by the user.
         *
         * @param lang          The lang to use. 2 characters.
         * @param language      The language string to parse, contains all sentences.
         * @param force         If true, replace the language sentences.
         * @param callback      Callback to execute.
         * @returns {Message}   Instance of Message.
         */
        Lang.prototype.addLanguage = function (lang, language, force, callback) {
            if (force === void 0) { force = false; }
            if (callback === void 0) { callback = null; }
            // Check if the language is authorized.
            if (this._languages[lang]) {
                // Check if the language is already set, won't update it if it is already, excepted if we force it.
                if (!this._languageIsSet(lang) || force) {
                    try {
                        // Add the language texts to the language.
                        this._languages[lang][this._FIELD_CONTENT_LANG] = ((typeof language == 'string' && this._parse) ? JSON.parse(language) : language);
                    }
                    catch (e) {
                        consoleDev("Lang.addLanguage() Unable to parse the language JSON string." + e.message, 'error');
                    }
                    var response = new __message("The language *" + lang + "* was added to the user available languages successfully.", { lang: lang }, true);
                    if (callback) {
                        // Call callback if exists.
                        callback(response);
                    }
                    // Return user confirmation.
                    return response;
                }
                else {
                    var response = new __message("Unable to add the language, it is already set.", { lang: lang });
                    if (callback) {
                        // Call callback if exists.
                        callback(response);
                    }
                    return response;
                }
            }
            else {
                var response = new __message("Unable to add the language, it's not authorized.", { lang: lang });
                if (callback) {
                    // Call callback if exists.
                    callback(response);
                }
                return response;
            }
        };
        /**
         * Get a sentence in a language. Use the main user language as default.
         *
         * @param message               message of the sentence, should start by '__' but if there is no '__' they are automatically added. Could be a complex object with args.
         * @param variables             If set, will overload the variables by merging these variables with the variables already contained in the message but will not modify them, just use them this time.
         * @param options               Contains options, such as the language to use, if markdown should be applied and so on.
         * @returns {Message|string}    Will contains a string if there is no error. Contains a Message if there is.
         */
        Lang.prototype.get = function (message, options, variables) {
            if (options === void 0) { options = {}; }
            if (variables === void 0) { variables = false; }
            // Apply markdown by default.
            if (typeof options.markdown === 'undefined') {
                options.markdown = true;
            }
            // Check message.
            if (!this._checkMessageFormat(message)) {
                // Don't try to translate. TODO Protect against injections? Maybe somewhere else, probably server side!
                return message;
            }
            // Get the sentence from the file in the memory.
            var response = this._getSentence(message, options, variables);
            // If we got an object, it's a Message instance.
            if (response.isCustomMessage && response.getStatus()) {
                // Success.
                return response.getMessage({ translate: false }); // Don't try to translate again ^_^ (Infinite loop)
            }
            else if (response.isCustomMessage && !response.getStatus()) {
                // Failure - The id couldn't be found in any language.
                return response.getMessage({ translate: false }); // Don't try to translate ^_^ (Infinite loop)
            }
        };
        /**
         * Returns the default app language.
         * @returns {string}
         */
        Lang.prototype.getAppDefaultLang = function () {
            return this._appDefaultLang;
        };
        /**
         * Returns the native user language based on the user config.
         * @returns {string}
         */
        Lang.prototype.getUserNativeLang = function (_default) {
            if (_default === void 0) { _default = null; }
            return this._getUserConfig('nativeLanguage', _default);
        };
        /**
         * Returns the user languages, those he wants to be able to see and manage translations for.
         * @returns {Array}
         */
        Lang.prototype.getUserUsedLanguages = function () {
            return this._getUserConfig('usedLanguages', new Array());
        };
        /**
         * Returns the default user language. Shortcut.
         * @returns {string}
         */
        Lang.prototype.getLang = function (_default) {
            if (_default === void 0) { _default = this.getAppDefaultLang(); }
            return this.getUserNativeLang(_default);
        };
        /**
         * Get the entire languages object with everything inside.
         * @returns {*}
         */
        Lang.prototype.getLanguages = function () {
            return this._languages;
        };
        /**
         * Load all the user languages.
         *
         * @param force             If true, then will reload the loaded languages sentences.
         * @param reloadLanguages   If true, then will reload the language configuration file that contains languages. Not used yet. TODO Somehow allow to reload the languages.json file.
         */
        Lang.prototype.loadAllLanguages = function (force, reloadLanguages) {
            if (force === void 0) { force = false; }
            if (reloadLanguages === void 0) { reloadLanguages = false; }
            _.each(this.getUserUsedLanguages(), function (language) {
                // If we force reload or if the language hasn't been added yet.
                if (!this._languageIsSet(language) || force) {
                    // Load the language file and add it to the global singleton lang instance.
                    this.requireLanguageFile(language, force);
                }
            }, this);
        };
        /**
         * Send an async request to get a specific language file and then add it into the current lang singleton instance.
         *
         * @param lang      Short name of the language to load, 2 characters.
         * @param force     If true, then will reload the loaded language sentences.
         */
        Lang.prototype.requireLanguageFile = function (lang, force) {
            if (force === void 0) { force = false; }
            // Store it into a temp var because we won't have access to "this" inside the requireJs scope.
            var keyLoadNewLanguage = this._config.keyLoadNewLanguage;
            // Set the key defined in the application, it will be used as global reference to load the right file.
            window[keyLoadNewLanguage] = lang;
            require(['text!baseLanguage/' + lang + '.json', 'Lang', 'Message'], function (language, _lang, _message) {
                // Free the var.
                delete window[keyLoadNewLanguage];
                // Get the global lang instance.
                var _lang = _lang.Lang.waitForInstanceSynch();
                // Add the new language.
                _lang.addLanguage(lang, language, force, function (message) {
                    // Warn the user a new language has been added.
                    consoleDev(message.getMessage(), 'debug');
                });
            });
        };
        /**
         *****************************************************************************************
         ****************************** Private methods ******************************************
         *****************************************************************************************
         */
        /**
         * Initialize the language instance. (Singleton)
         * Parse the JSON strings and store results.
         *
         * @param configServerPublic    The public server config.
         * @param languagesConfigFile   The public JSON languages config file.
         * @param defaultLanguageFile   The public JSON language text file to use as default an main language.
         * @param callback              Eventual callback to execute once the initialization is done.
         * @private
         */
        Lang.prototype._initialize = function (configServerPublic, languagesConfigFile, defaultLanguageFile, callback) {
            var self = this;
            // Message will be provided by the loader. Will use default
            this._config = configServerPublic;
            try {
                // Get the file content.
                if (this._parse) {
                    this._languages = JSON.parse(languagesConfigFile);
                    defaultLanguageFile = JSON.parse(defaultLanguageFile);
                }
                else {
                    this._languages = languagesConfigFile;
                    defaultLanguageFile = defaultLanguageFile;
                }
                this._messageKey = configServerPublic.languages.messageKey;
                this._argsKey = configServerPublic.languages.argsKey;
                this._prefixMessageCode = configServerPublic.languages.prefixMessageCode;
                // Get the default language identifier, because the language provided during the initialization is always the default application language.
                this._appDefaultLang = defaultLanguageFile[this._FIELD_KEY_LANG];
                // Add default language to the languages.
                this.addLanguage(configServerPublic.defaultLanguage, defaultLanguageFile, false, function (message) {
                    // Display the message but in the client we wait that the global lang object is accessible.
                    if (__config.target == 'browser') {
                        __lang.waitForInstance(function () {
                            consoleDev(message.getMessage());
                            // Load the languages used by the user.
                            self.loadAllLanguages();
                        }, 1);
                    }
                    else {
                        consoleDev(message.getMessage());
                    }
                    if (callback) {
                        callback();
                    }
                });
            }
            catch (e) {
                consoleDev("Lang._initialize() An error happened while parsing the languages JSON:", 'error');
                consoleDev(e.message, 'error');
            }
        };
        /**
         * Check if the language is set, so if the text of the language is already added.
         *
         * @param lang          Lang to check. 2 characters.
         * @returns {boolean}
         * @private
         */
        Lang.prototype._languageIsSet = function (lang) {
            if (this._languages && this._languages[lang] && this._languages[lang][this._FIELD_CONTENT_LANG]) {
                return true;
            }
            else {
                return false;
            }
        };
        /**
         * Check if the message is correctly formatted.
         *
         * @param code            Code of the sentence.
         * @returns {boolean}
         * @private
         */
        Lang.prototype._checkMessageFormat = function (code) {
            return code && code.substr && code.substr(0, 2) == this._prefixMessageCode;
        };
        /**
         * Get a sentence from the languages. If the language doesn't exists yet then import it but cannot send callback response yet.
         *
         * @param id            Id of the sentence.
         * @param variables     If set, will overload the variables by merging these variables with the variables already contained in the message but will not modify them, just use them this time.
         * @param options       Contains options, such as the language to use, if markdown should be applied and so on.
         * @returns {Message|null} If the language is already loaded then return a Message instance. If it has to be loaded, it will runs in an asynchronous request.
         * @private
         *
         * @Algorithm
         * Check if the key exists in the targeted language. If so, use it.
         * If not, check if the targeted language is the user native language.
         * If not, check if the key exists in the native language.
         * If not, check if the key exists in the default app language.
         * If not, render the key.
         */
        Lang.prototype._getSentence = function (id, options, variables) {
            if (options === void 0) { options = {}; }
            if (variables === void 0) { variables = false; }
            // Use default user language by default.
            if (typeof options.language === 'undefined') {
                options.language = this._appDefaultLang;
            }
            var languageSentences;
            var sentence;
            // If the language exists and its text is set, get it.
            if (this._languageIsSet(options.language)) {
                languageSentences = this._languages[options.language];
                sentence = languageSentences[this._FIELD_CONTENT_LANG][id];
                if (sentence) {
                    // We used the targeted language.
                    return this._transformSentence(sentence, options, variables);
                }
            }
            // Fallback 1 - User native language.
            // Check if the targeted language is the user native language.
            if (this.getUserNativeLang() !== options.language && this._languageIsSet(this.getUserNativeLang())) {
                options.language = this.getUserNativeLang();
                languageSentences = this._languages[options.language];
                sentence = languageSentences[this._FIELD_CONTENT_LANG][id];
                if (sentence) {
                    // We fallback into the user native language.
                    return this._transformSentence(sentence, options, variables);
                }
            }
            // Fallback 2 - Default App language.
            // Check if the key exists in the default app language.
            if (this._languageIsSet(this.getAppDefaultLang())) {
                options.language = this.getAppDefaultLang();
                languageSentences = this._languages[options.language];
                sentence = languageSentences[this._FIELD_CONTENT_LANG][id];
                if (sentence) {
                    // We fallback into the app default language.
                    return this._transformSentence(sentence, options, variables);
                }
            }
            // Fallback 3 - No solution.
            // No sentence found with this code, return the code for debug/support.
            return new __message(id);
        };
        /**
         * Transform a sentence by generating variables and applying eventual options, like markdown.
         *
         * @param sentence      Sentence to transform.
         * @param options       Options. (markdown)
         * @param variables     Variables in the sentence to inject.
         * @returns {Message}
         * @private
         */
        Lang.prototype._transformSentence = function (sentence, options, variables) {
            if (options === void 0) { options = {}; }
            if (variables === void 0) { variables = false; }
            // Apply markdown by default.
            if (typeof options.markdown === 'undefined') {
                options.markdown = true;
            }
            // Replace all args by the values.
            var message = this._replaceVariablesInText(sentence, variables, options.language);
            // Convert using markdown.
            if (options.markdown) {
                // Delete the fucking <p> tag around the text, we don't want that.
                message = markdown.toHTML(message).replace(/<\/?p>/ig, '');
            }
            return new __message(message, false, true);
        };
        /**
         * Replace the tags in the text by the args.
         *
         * @param message      The message.
         * @param variables    The variables to replace in the message.
         * @param lang         Lang used, 2 characters.
         * @returns {string}   The string built.
         * @private
         */
        Lang.prototype._replaceVariablesInText = function (message, variables, lang) {
            for (var i in variables) {
                // TODO Explain what it does, because I'm like O_o here. But it works fine => I'm a genius and I didn't know it.
                message = message.split(((i.charAt(0) !== this.PATTERN_ARGS ? this.PATTERN_ARGS : '') + i)).join(variables[i]);
            }
            // Check if some of the args was other language keys.
            return this._replaceSubKeys(this, message, variables, /__\w+/g, this._languages[lang][this._FIELD_CONTENT_LANG], lang);
        };
        /**
         * Replace the sub keys into the sentence by the actual text.
         *
         * @param self      Lang instance.
         * @param sentence  Sentence where to replace sub keys.
         * @param variables The variables to replace in the message.
         * @param regex     Regex to apply.
         * @param array     Array containing the language sentences.
         * @param lang      Lang to apply
         * @returns {string|void}
         * @private
         */
        Lang.prototype._replaceSubKeys = function (self, sentence, variables, regex, array, lang) {
            return sentence.replace(regex, function (i) {
                if (array[i]) {
                    var message = new Message(array[i], variables);
                    return self._replaceVariablesInText(message.getMessage(), variables, lang);
                }
                else {
                    return (dev() ? i + ' doesn\'t exists in ' + lang : '');
                }
            });
        };
        /**
         * Retrieves the user config key or a default value if not set.
         *
         * @param key           Key to retrieve.
         * @param _default      Default value to return if the key doesn't exist.
         * @returns {any}
         * @private
         */
        Lang.prototype._getUserConfig = function (key, _default) {
            return this._config.user && typeof this._config.user[key] !== 'undefined' ? this._config.user[key] : _default;
        };
        /**
         *****************************************************************************************
         ****************************** Statics methods ******************************************
         *****************************************************************************************
         */
        /**
         * Use this function when you need to load the global "lang" on document DOM loading. Asynch.
         * @returns {*}
         */
        Lang.waitForInstance = function (callback, timeout) {
            if (timeout === void 0) { timeout = 50; }
            if (!window[Lang.FIELD_NAME_SINGLETON]) {
                window.setTimeout(function () {
                    Lang.waitForInstance(callback);
                }, timeout);
            }
            else {
                callback(window[Lang.FIELD_NAME_SINGLETON]);
            }
        };
        /**
         * Use this function when you need to load the global "lang" on document DOM loading. Synch.
         * @returns {*}
         */
        Lang.waitForInstanceSynch = function (timeout) {
            if (timeout === void 0) { timeout = 50; }
            if (!window[Lang.FIELD_NAME_SINGLETON]) {
                window.setTimeout(function () {
                    Lang.waitForInstanceSynch();
                }, timeout);
            }
            else {
                return window[Lang.FIELD_NAME_SINGLETON];
            }
        };
        /**
         * Name of the singleton in windows[] object. Accessible once the class is initialized. [GLOBAL]
         */
        Lang.FIELD_NAME_SINGLETON = 'lang';
        return Lang;
    })();
    exports.Lang = Lang;
});
//# sourceMappingURL=Lang.js.map