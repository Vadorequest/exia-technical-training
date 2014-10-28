/// <reference path='Init.ts' />

import init = require("Init");

declare var stage: PIXI.Stage;
declare var renderer: PIXI.IPixiRenderer;
declare var farSprite: PIXI.Sprite;
declare var midSprite: PIXI.Sprite;

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
        this._initGame();
        consoleDev('Custom home initialization done with success.', 'debug');
    }

    /**
     * Initialize Game canvas.
     * @private
     */
    private _initGame(){
        consoleDev('Initializing Pixi. ', 'debug');

        stage = new PIXI.Stage(0x222222);
        renderer = PIXI.autoDetectRenderer(
            /*$(window).width() / 100 * 90,
             $(window).height() / 100 * 90*/
            $('#game').width(),
            $('#game').height()
        );

        // Set the canvas id. We basically replace the skeleton.
        renderer.view.id = "game";

        // Append the rendered view to the DOM.
        $('#game').replaceWith(renderer.view);

        var farTexture: PIXI.Texture = PIXI.Texture.fromImage("images/parallax-scroller/bg-far.png");
        farSprite = new PIXI.Sprite(farTexture);
        farSprite.position.x = 0;
        farSprite.position.y = 0;
        stage.addChild(farSprite);// Adding the farSprite to the stage.

        var midTexture: PIXI.Texture = PIXI.Texture.fromImage("images/parallax-scroller/bg-mid.png");
        midSprite = new PIXI.Sprite(midTexture);
        midSprite.position.x = 0;
        midSprite.position.y = 128;
        stage.addChild(midSprite);// Adding the midSprite to the stage.

        var self = this;
        requestAnimFrame(function() {self._update(); });

        consoleDev('Pixi has been initialized and the canvas has been refreshed. ', 'debug');
    }

    /**
     * Update the canvas and calls itself indefinitely.
     * @private
     */
    private _update(){
        farSprite.position.x -= 0.128;
        midSprite.position.x -= 0.64;

        // Render the stage. Basically refresh the canvas content.
        renderer.render(stage);

        var self = this;
        requestAnimFrame(function() {self._update(); });
    }
}