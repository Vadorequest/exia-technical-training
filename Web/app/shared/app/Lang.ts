///<reference path='./lib/def/defLoader.d.ts'/>

import lang = require('./public/Lang');

/**
 * Server/TS build compatibility.
 */
declare var require;

/**
 * Manage all the languages server side.
 */
export class Lang extends lang.Lang {

    /**
     * Basically run the init method.
     * @param config            The public server config.
     * @param languages         The public JSON languages config file.
     * @param defaultLanguage   The public JSON language text file to use as default an main language.
     * @param message           Instance of the Message class, for the communication.
     */
    constructor(config: any, languages: any, defaultLanguage: any){
        super(config, languages, defaultLanguage, false);
    }
}