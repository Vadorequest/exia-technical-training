///<reference path='./../defLoader.d.ts' />
///<reference path='./../managers/def/defLoader.d.ts' />

module Game.Core {

    /**
     * Public class used to setup the game.
     */
    export class Engine {

        /**
         **************************************************************************************************
         **************************************** Constants ***********************************************
         **************************************************************************************************
         */

        /**
         **************************************************************************************************
         **************************************** Public properties ***************************************
         **************************************************************************************************
         */

        /**
         **************************************************************************************************
         **************************************** Private properties **************************************
         **************************************************************************************************
         */

        /**
         * The stage (Scène) is the context where the renderer is displayed.
         */
        private _stage;

        /**
         * The renderer is what is visible on the canvas.
         */
        private _renderer;

        /**
         * Manage layers.
         */
        private _layerManager: Game.Managers.LayerManager;

        /**
         * Manage sprites.
         */
        private _spriteManager: Game.Managers.SpriteManager;

        /**
         * Manage sprites.
         */
        private _textureManager: Game.Managers.TextureManager;

        /**
         **************************************************************************************************
         **************************************** Public methods ******************************************
         **************************************************************************************************
         */

        /**
         * Constructor.
         * Initialize managers.
         */
        constructor(){
            this._layerManager = new Game.Managers.LayerManager();
            this._spriteManager = new Game.Managers.SpriteManager();
            this._textureManager = new Game.Managers.TextureManager();
        }

        /**
         **************************************************************************************************
         **************************************** Private methods *****************************************
         **************************************************************************************************
         */


        /**
         * Initialize Game canvas.
         * @private
         */
        private _initGame(){
            consoleDev('Initializing the game... ', 'debug');

            this._stage = new PIXI.Stage(0x222222);
            this._renderer = PIXI.autoDetectRenderer(
                /*$(window).width() / 100 * 90,
                 $(window).height() / 100 * 90*/
                $('#game').width(),
                $('#game').height()
            );

            // Set the canvas id. We basically replace the skeleton.
            this._renderer.view.id = "game";

            // Append the rendered view to the DOM.
            $('#game').replaceWith(this._renderer.view);

            var farTexture = this._textureManager.createFromLocalImage('far', '/images/parallax-scroller/bg-far.png');
            var farSprite = this._spriteManager.createTiling(farTexture.__name, farTexture, 512, 256);
            var farSprite = new PIXI.TilingSprite(
                farTexture,
                512, 256
            );
            farSprite.position.x = 0;
            farSprite.position.y = 0;
            farSprite.tilePosition.x = 0;
            farSprite.tilePosition.y = 0;
            this._stage.addChild(farSprite);// Adding the farSprite to the stage.

            var midTexture: PIXI.Texture = PIXI.Texture.fromImage("/images/parallax-scroller/bg-mid.png");
            midSprite = new PIXI.TilingSprite(
                midTexture,
                512, 256
            );
            midSprite.position.x = 0;
            midSprite.position.y = 128;
            midSprite.tilePosition.x = 0;
            midSprite.tilePosition.y = 0;
            this._stage.addChild(midSprite);// Adding the midSprite to the stage.

            var self = this;
            requestAnimFrame(function() {self._update(); });

            consoleDev('Pixi has been initialized and the canvas has been refreshed. ', 'debug');
        }

        /**
         * Update the canvas and calls itself indefinitely.
         * @private
         */
        private _update(){
            farSprite.tilePosition.x -= 0.128;
            midSprite.tilePosition.x -= 0.64;

            // Render the stage. Basically refresh the canvas content.
            this._renderer.render(this._stage);

            var self = this;
            requestAnimFrame(function() {self._update(); });
        }

        /**
         **************************************************************************************************
         **************************************** Public static methods ***********************************
         **************************************************************************************************
         */

        /**
         * Public static method, accessible from the client to start the game init process.
         */
        public static initialize(){
            var gameEngine = new Game.Core.Engine();

            // Initialize the game.
            gameEngine._initGame();
        }
    }
}