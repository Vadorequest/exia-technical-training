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
        consoleDev('Custom home initialization starting...', 'debug');
        consoleDev('Initializing Pixi. ', 'debug');

        var stage : PIXI.Stage = new PIXI.Stage(0x222222);
        var renderer : PIXI.IPixiRenderer = PIXI.autoDetectRenderer(
            /*$(window).width() / 100 * 90,
            $(window).height() / 100 * 90*/
            $('#game').width(),
            $('#game').height()
        );
        renderer.view.id = "game";

        // Append the rendered view to the DOM.
        $('#game').replaceWith(renderer.view);

        // Render the stage. Basically refresh the canvas content.
        renderer.render(stage);

        consoleDev('Custom home initialization done with success.', 'debug');
    }
}