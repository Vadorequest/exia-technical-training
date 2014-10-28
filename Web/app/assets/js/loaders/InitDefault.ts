/// <reference path='Init.ts' />

import init = require("Init");

/**
 * Init the view/main.
 */
export class InitDefault extends init.Init{

    /**
     * Run the base level initialization by calling its parent.
     *
     * @param config            Config object.
     * @param languages         All languages and config. Doesn't contains the texts, only config.
     * @param defaultLanguage   The entire default language.
     */
    constructor(config: any, languages: any, defaultLanguage: any){
        super(config, languages, defaultLanguage);
        this._custom();
    }

    /**
     * Custom function to initialize specific stuff for this page.
     * @private
     */
    private _custom(){
        consoleDev('Custom index initialization starting...', 'debug');
        consoleDev('Custom index initialization done with success.', 'debug');
    }
}