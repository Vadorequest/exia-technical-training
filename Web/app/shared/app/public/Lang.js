///<reference path='./../lib/def/defLoader.d.ts'/>
define(["require", "exports"], function(require, exports) {
    

    /**
    * Manage all the languages client side.
    * TODO Use the default language when the sentence is not found in the custom language, if the custom isn't the default.
    * The purpose is to always display something to the user, even if it's not the good language.
    */
    var Lang = (function () {
        /**
        * Basically run the init method.
        * @param serverConfig            The public server config.
        * @param languages         The public JSON languages config file.
        * @param defaultLanguage   The public JSON language text file to use as default an main language.
        * @param message           Instance of the Message class, for the communication.
        */
        function Lang(serverConfig, languages, defaultLanguage, parse) {
            if (typeof parse === "undefined") { parse = true; }
            /**
            * Contains all languages in use by the user.
            */
            this._userLangs = new Array();
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

            this._initialize(serverConfig, languages, defaultLanguage);
        }
        /**
        * Add a language to the languages used by the user.
        * @param lang          The lang to use. 2 characters.
        * @param language      The language string to parse.
        * @param callback      Callback to execute.
        * @returns {Message}   Instance of Message.
        */
        Lang.prototype.addLanguage = function (lang, language, callback) {
            if (typeof callback === "undefined") { callback = null; }
            if (this._languages[lang]) {
                // Language authorized.
                if (!this._languages[lang][this._FIELD_CONTENT_LANG]) {
                    try  {
                        // Add the language texts to the language.
                        this._languages[lang][this._FIELD_CONTENT_LANG] = ((typeof language == 'string' && this._parse) ? JSON.parse(language) : language);
                        this._userLangs.push(lang);
                    } catch (e) {
                        consoleDev("Lang.addLanguage() Unable to parse the language JSON string." + e.message, 'error');
                    }

                    var response = new __message("The language *" + lang + "* was added to the user available languages successfully.", { lang: lang }, true);

                    if (callback) {
                        // Call callback if exists.
                        callback(response);
                    }
                    ;

                    // Return user confirmation.
                    return response;
                } else {
                    var response = new __message("Unable to add the language, it is already set.", { lang: lang });

                    if (callback) {
                        // Call callback if exists.
                        callback(response);
                    }
                    ;

                    return response;
                }
            } else {
                var response = new __message("Unable to add the language, it's not authorized.", { lang: lang });

                if (callback) {
                    // Call callback if exists.
                    callback(response);
                }
                ;

                return response;
            }
        };

        /**
        * Get a sentence in a language. Use the main user language as default.
        * @param message               message of the sentence, should start by '__' but if there is no '__' they are automatically added. Could be a complex object with args.
        * @param args                  Args used to replace the dynamics tags in the sentence, if they exists. Will replace the default tags.
        * @param lang                  The lang to use. 2 characters. Will use as default the main user language.
        * @returns {Message|string}    Will contains a string if there is no error. Contains a Message if there is.
        */
        Lang.prototype.get = function (message, args, lang) {
            if (typeof args === "undefined") { args = false; }
            if (typeof lang === "undefined") { lang = this._userDefaultLang; }
            // Check message.
            if (!this._checkMessageFormat(message)) {
                // Don't try to translate. TODO Protect against injections? Maybe somewhere else, probably server side!
                return message;
            }

            // Get the sentence from the file in the memory. TODO CHANGE MARKDOWN
            var response = this._getSentence(message, args, true, lang);

            // If we got an object, it's a Message instance.
            if (response.isCustomMessage && response.getStatus()) {
                // Don't try to translate ^_^ (Infinite loop)
                return response.getMessage(false);
            } else if (response.isCustomMessage && !response.getStatus()) {
                // A new language is adding, in this case the user will be informed asynchronously.
                // Don't try to translate ^_^ (Infinite loop)
                return response.getMessage(false);
            } else {
                // Content found but refused.
                return response;
            }
        };

        /**
        * Returns the default user language.
        * @returns {string}
        */
        Lang.prototype.getLang = function () {
            return this._userDefaultLang;
        };

        /**
        * Returns all the user languages.
        * @returns {Array}
        */
        Lang.prototype.getLangs = function () {
            return this._userLangs;
        };

        /**
        * Returns all the foreigners languages in the order they was added. (Basically the preference order.)
        * @returns {Array}
        */
        Lang.prototype.getForeignLang = function () {
            var langs = this.getLangs();

            // Remove the main language.
            langs.shift();

            return langs;
        };

        /**
        * Get the entire languages object with everything inside.
        * @returns {*}
        */
        Lang.prototype.getLanguages = function () {
            return this._languages;
        };

        /**
        *****************************************************************************************
        ****************************** Private methods ******************************************
        *****************************************************************************************
        */
        /**
        * Initialize the language instance. (Singleton)
        * Parse the JSON strings and store results.
        * @param configServerPublic    The public server config.
        * @param languagesConfigFile   The public JSON languages config file.
        * @param defaultLanguageFile   The public JSON language text file to use as default an main language.
        * @private
        * TODO Initialize the user language too, not only the default.
        */
        Lang.prototype._initialize = function (configServerPublic, languagesConfigFile, defaultLanguageFile) {
            // Message will be provided by the loader. Will use default
            this._config = configServerPublic;

            try  {
                // Get the file content.
                if (this._parse) {
                    this._languages = JSON.parse(languagesConfigFile);
                    defaultLanguageFile = JSON.parse(defaultLanguageFile);
                } else {
                    this._languages = languagesConfigFile;
                    defaultLanguageFile = defaultLanguageFile;
                }

                this._messageKey = configServerPublic.languages.messageKey;
                this._argsKey = configServerPublic.languages.argsKey;
                this._prefixMessageCode = configServerPublic.languages.prefixMessageCode;

                // Get the default language identifier.
                this._userDefaultLang = defaultLanguageFile[this._FIELD_KEY_LANG];

                // Add default language to the languages.
                this.addLanguage(configServerPublic.defaultLanguage, defaultLanguageFile, function (message) {
                    // Display the message but wait a bit before, because the global lang object isn't accessible at this very moment.
                    setTimeout(function () {
                        consoleDev(message.getMessage());
                    }, 2000);
                });
            } catch (e) {
                consoleDev("Lang._initialize() Unable to parse the languages JSON.", 'error');
                consoleDev(e.message, 'error');
            }
        };

        /**
        * Check if the language is set, so if the text of the language is already added.
        * @param lang          Lang to check. 2 characters.
        * @returns {boolean}
        * @private
        */
        Lang.prototype._languageIsSet = function (lang) {
            if (this._languages && this._languages[lang] && this._languages[lang][this._FIELD_CONTENT_LANG]) {
                return true;
            } else {
                return false;
            }
        };

        /**
        * Check if the message is correctly formatted.
        * @param code            Code of the sentence.
        * @returns {boolean}
        * @private
        */
        Lang.prototype._checkMessageFormat = function (code) {
            return code && code.substr && code.substr(0, 2) == this._prefixMessageCode;
        };

        /**
        * Get a sentence from the languages. If the language doesn't exists yet then import it but cannot send callback response yet.
        * @param id            Id of the sentence.
        * @param args          Args to replace.
        * @param _markdown     Format in markdown.
        * @param lang          Lang to check. 2 characters.
        * @returns {Message|null} If the language is already loaded then return a Message instance. If it has to be loaded, it will runs in an asynchronous request.
        * @private
        */
        Lang.prototype._getSentence = function (id, args, _markdown, lang) {
            if (typeof args === "undefined") { args = false; }
            if (typeof _markdown === "undefined") { _markdown = false; }
            if (typeof lang === "undefined") { lang = this._userDefaultLang; }
            var language = this._languages[lang];

            // If the language exists and its text is set, get it.
            if (this._languageIsSet(lang)) {
                // Get the sentence.
                var sentence = language[this._FIELD_CONTENT_LANG][id];

                // If a sentence is found from this code.
                if (sentence) {
                    // Replace all args by the values.
                    var message = this._replaceArgsInText(sentence, args, lang);

                    // Convert using markdown.
                    if (_markdown) {
                        message = markdown.toHTML(message);
                    }

                    return new __message(message, false, true);
                } else {
                    // No sentence found with this code, return the code and the lang for debug/support.
                    return new __message('{' + id + '} (' + lang + ')');
                }
            } else {
                // Else require the script and return the sentence.
                // Set the key defined in the application.
                var _keyLoadNewLanguage = this._config.keyLoadNewLanguage;
                window[_keyLoadNewLanguage] = lang;
                require(['text!baseLanguage/' + lang + '.json', 'Lang', 'Message'], function (language, _lang, _message) {
                    // Free the var.
                    delete window[_keyLoadNewLanguage];

                    // Get the global lang instance.
                    var __lang = _lang.Lang.waitForInstanceSynch();

                    // Add the new language.
                    __lang.addLanguage(lang, language, function (message) {
                        // Warn the user a new language has been added.
                        consoleDev(message.getMessage()); // TODO really warn the user.
                    });
                });

                return new __message('The language that you want to use was not in the browser cache. ' + 'You will be notified when it will be correctly cached. Please perform again the operation if you want to see the message in this language.', { lang: lang }, false);
            }
        };

        /**
        * Replace the tags in the text by the args.
        * @param message      The message.
        * @param args          The args to replace in the message.
        * @returns {string}    The string built.
        * @private
        */
        Lang.prototype._replaceArgsInText = function (message, args, lang) {
            for (var i in args) {
                message = message.split(((i.charAt(0) !== this.PATTERN_ARGS ? this.PATTERN_ARGS : '') + i)).join(args[i]);
            }

            // Check if some of the args was other language keys.
            return this._replaceSubKeys(this, message, args, /__\w+/g, this._languages[lang][this._FIELD_CONTENT_LANG], lang);
        };

        /**
        * Replace the sub keys into the sentence by the actual text.
        * @param self
        * @param sentence
        * @param rx
        * @param array
        * @param lang
        * @returns {string|void}
        * @private
        */
        Lang.prototype._replaceSubKeys = function (self, sentence, args, rx, array, lang) {
            return sentence.replace(rx, function (i) {
                if (array[i]) {
                    var message = new Message(array[i], args);
                    return self._replaceArgsInText(message.getMessage(), args, lang);
                } else {
                    return (dev() ? i + ' doesn\'t exists in ' + lang : '');
                }
            });
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
        Lang.waitForInstance = function (callback) {
            if (!window[Lang.FIELD_NAME_SINGLETON]) {
                window.setTimeout(function () {
                    Lang.waitForInstance(callback);
                }, 50);
            } else {
                callback(window[Lang.FIELD_NAME_SINGLETON]);
            }
        };

        /**
        * Use this function when you need to load the global "lang" on document DOM loading. Synch.
        * @returns {*}
        */
        Lang.waitForInstanceSynch = function () {
            if (!window[Lang.FIELD_NAME_SINGLETON]) {
                window.setTimeout(function () {
                    Lang.waitForInstanceSynch();
                }, 50);
            } else {
                return window[Lang.FIELD_NAME_SINGLETON];
            }
        };
        Lang.FIELD_NAME_SINGLETON = 'lang';
        return Lang;
    })();
    exports.Lang = Lang;
});
//# sourceMappingURL=Lang.js.map
