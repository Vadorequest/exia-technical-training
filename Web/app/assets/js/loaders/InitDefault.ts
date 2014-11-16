///<reference path='./../lib/def/defLoader.d.ts'/>
/// <reference path='Init.ts' />

import init = require("Init");

declare var Game: any;

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

        // Starts the game.
        Game.Core.Engine.initialize();
    }
}