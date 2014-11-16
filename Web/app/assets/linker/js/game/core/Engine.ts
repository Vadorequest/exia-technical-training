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
         * Canvas ID in the DOM that will display the game.
         * @type {string}
         */
        private CANVAS_ID: string = 'game';

        /**
         * Settings for the FAR texture, displayed as final background.
         * @type {{NAME: string, IMG: string, WIDTH: number, HEIGHT: number, SPEED: number}}
         */
        private FAR_TEXTURE_SETTINGS: Game.Core.ITextureSettings = {
            NAME: 'far',
            IMG: 'bg-far',
            WIDTH: 512,
            HEIGHT: 256,
            SPEED: 0.128
        };

        /**
         * Settings for the MID texture, displayed on top of the FAR texture.
         * @type {{NAME: string, IMG: string, WIDTH: number, HEIGHT: number, SPEED: number, SPRITE_POSITION_Y: number}}
         */
        private MID_TEXTURE_SETTINGS: Game.Core.ITextureSettings = {
            NAME: 'mid',
            IMG: 'bg-mid',
            WIDTH: 512,
            HEIGHT: 256,
            SPEED: 0.64,
            SPRITE_POSITION_Y: 128
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

            this._stage = new Game.Core.Stage(0x222222);
            this._renderer = PIXI.autoDetectRenderer(
                /*$(window).width() / 100 * 90,
                 $(window).height() / 100 * 90*/
                $('#game').width(),
                $('#game').height()
            );

            // Set the canvas id. We basically replace the skeleton.
            this._renderer.view.id = this.CANVAS_ID;

            // Append the rendered view to the DOM.
            $('#game').replaceWith(this._renderer.view);

            // Initialize textures. Order count, last added will be on top of previous textures.
            this._initializeTextures(this.FAR_TEXTURE_SETTINGS, this.MID_TEXTURE_SETTINGS);

            this._requestAnimFrame();

            consoleDev('The game has been started. ', 'debug');
        }

        /**
         * Initialize all textures.
         *
         * @param texturesSettings
         * @private
         */
        private _initializeTextures(...texturesSettings: Game.Core.ITextureSettings[]){
            _.each(texturesSettings, function(textureSettings: Game.Core.ITextureSettings){
                var farTexture = this._textureManager.createTextureFromLocalImage(
                    textureSettings.NAME,
                    textureSettings.IMG
                );

                var farSprite = this._tilingSpriteManager.createTilingSprite(
                    textureSettings.NAME,
                    farTexture,
                    textureSettings.WIDTH,
                    textureSettings.HEIGHT
                );

                // Set texture properties based on the settings.
                farSprite.position.x = textureSettings.SPRITE_POSITION_X || 0;
                farSprite.position.y = textureSettings.SPRITE_POSITION_Y || 0;
                farSprite.tilePosition.x = textureSettings.SPRITE_TILE_POSITION_X || 0;
                farSprite.tilePosition.y = textureSettings.SPRITE_TILE_POSITION_Y || 0;

                // Add the farSprite to the stage.
                this._stage.addChild(farSprite);
            }, this);// Use internal reference as this. Otherwise we will be in another context and "this" will not be a "Engine" instance.
        }

        /**
         * Refresh the rendered content.
         * @private
         */
        private _requestAnimFrame(){
            var self = this;
            requestAnimFrame(function() {self._update(); });
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

            // Infinite loop that will refresh the rendered content on each loop.
            this._requestAnimFrame();
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