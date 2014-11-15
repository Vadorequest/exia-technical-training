///<reference path='./lib/def/defLoader.d.ts'/>

import _lang = require('./public/Lang');

/**
 * Server/TS build compatibility.
 */
declare var require;

/**
 * Manage all the languages server side.
 */
export class Lang extends _lang.Lang {

    /**
     * Basically run the init method.
     * @param config            The public server config.
     * @param languages         The public JSON languages config file.
     * @param defaultLanguage   The public JSON language text file to use as default an main language.
     */
    constructor(config: any, languages: any, defaultLanguage: any){
        super(config, languages, defaultLanguage, false);
    }

    /**
     * Load all languages.
     * Must be called once the global "lang" singleton has been set.
     * We must use fs.readFileSynch instead of node require if we want to specify the file extension, because the file is loaded using requireJs and we use absolute path.
     *
     * @param force             If true, then will reload the loaded languages sentences.
     * @param reloadLanguages   If true, then will reload the language configuration file that contains languages.
     */
    public loadAllLanguages(force: boolean = false, reloadLanguages: boolean = false){
        // Load the file that contains all language configuration.
        var pathLanguages = __config.path.base + __config.path.languages;
        var languages = reloadLanguages ? require(pathLanguages + 'languages') : this._languages;

        _.each(languages, function(language){
            // If we force reload or if the language hasn't been added yet.
            if(!this._languageIsSet(language.min) || force){
                // Load the language file and add it to the global singleton lang instance.
                this.addLanguage(language.min, require(pathLanguages + language.min), force, function(message){
                    console.log(message.getMessage());
                });
            }
        }, this);
    }
}