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
        private FAR_TEXTURE_SETTINGS: Game.Core.ITextureSettings = {
            NAME: 'far',
            IMG: 'bg-far',
            WIDTH: 512,
            HEIGHT: 256,
            SPEED: 0.128
        };

        private MID_TEXTURE_SETTINGS: Game.Core.ITextureSettings = {
            NAME: 'mid',
            IMG: 'bg-mid',
            WIDTH: 512,
            HEIGHT: 256,
            SPEED: 0.64
        };

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
         * Manage tiling sprites.
         */
        private _tilingSpriteManager: Game.Managers.TilingSpriteManager;

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
            this._tilingSpriteManager = new Game.Managers.TilingSpriteManager();
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

            var farTexture = this._textureManager.createTextureFromLocalImage(this.FAR_TEXTURE_SETTINGS.NAME, this.FAR_TEXTURE_SETTINGS.IMG);
            var farSprite = this._tilingSpriteManager.createTilingSprite(this.FAR_TEXTURE_SETTINGS.NAME, farTexture, this.FAR_TEXTURE_SETTINGS.WIDTH, this.FAR_TEXTURE_SETTINGS.HEIGHT);

            farSprite.position.x = 0;
            farSprite.position.y = 0;
            farSprite.tilePosition.x = 0;
            farSprite.tilePosition.y = 0;

            this._stage.addChild(farSprite);// Add the farSprite to the stage.

            var midTexture = this._textureManager.createTextureFromLocalImage(this.MID_TEXTURE_SETTINGS.NAME, this.MID_TEXTURE_SETTINGS.IMG);
            var midSprite = this._tilingSpriteManager.createTilingSprite(this.MID_TEXTURE_SETTINGS.NAME, midTexture, this.MID_TEXTURE_SETTINGS.WIDTH, this.MID_TEXTURE_SETTINGS.HEIGHT);

            midSprite.position.x = 0;
            midSprite.position.y = 128;
            midSprite.tilePosition.x = 0;
            midSprite.tilePosition.y = 0;

            this._stage.addChild(midSprite);// Add the midSprite to the stage.

            var self = this;
            requestAnimFrame(function() {self._update(); });

            consoleDev('The game has been started. ', 'debug');
        }

        /**
         * Update the canvas and calls itself indefinitely.
         * @private
         */
        private _update(){
            this._tilingSpriteManager.get(this.FAR_TEXTURE_SETTINGS.NAME).decreaseTilePosition(this.FAR_TEXTURE_SETTINGS.SPEED);
            this._tilingSpriteManager.get(this.MID_TEXTURE_SETTINGS.NAME).increaseTilePosition(this.MID_TEXTURE_SETTINGS.SPEED);

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