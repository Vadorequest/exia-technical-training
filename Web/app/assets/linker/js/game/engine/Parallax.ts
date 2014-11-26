///<reference path='./../defLoader.d.ts' />
///<reference path='./../managers/def/defLoader.d.ts' />

module Game.Engine {

    /**
     * Public class used to setup the game.
     */
    export class Parallax {

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


        //private CHARACTER_TEXTURE_SETTINGS: Game.Core.ITextureSettings = {
        //    NAME: 'character',
        //    IMG: 'character',
        //    WIDTH: 150,
        //    HEIGHT: 361,
        //    SPEED: 0.32,
        //    SPRITE_POSITION_Y: 100,
        //    // Callback once it's loaded
        //    ONCE_LOADED: function(){
        //
        //    }
        //};

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
        private _layerManager: Game.Managers.LayerManager = new Game.Managers.LayerManager();

        /**
         * Manage sprites.
         */
        private _textureManager: Game.Managers.TextureManager = new Game.Managers.TextureManager();

        /**
         * Manage tiling sprites.
         */
        private _tilingSpriteManager: Game.Managers.TilingSpriteManager = new Game.Managers.TilingSpriteManager();

        /**
         * Assets to load before to start the game.
         * They will be put in the Pixi cache and used from it afterwards.
         * The game won't start before all assets are loaded.
         *
         * @type {string[]}
         * @private
         */
        private _assetsToLoad: string[] = [
            // Sprites
            Game.Helpers.Path.resolveSprite('wall'),
            Game.Helpers.Path.resolveSprite('dragonBones'),

            // Images
            Game.Helpers.Path.resolveImage('dragonBones'),
            Game.Helpers.Path.resolveImage('character'),
            Game.Helpers.Path.resolveImage('bg-mid'),
            Game.Helpers.Path.resolveImage('bg-far'),

            // Animations
            Game.Helpers.Path.resolveAnim('dragonBones')
        ];

        /**
         **************************************************************************************************
         **************************************** Public methods ******************************************
         **************************************************************************************************
         */

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

            // Load all our assets. Once it's done then start the game.
            Game.Core.AssetLoader.loadAssets(this._assetsToLoad, this._onceAssetsLoaded.bind(this));
        }

        /**
         * Executed once assets are loaded by the asset loader.
         * @private
         */
        private _onceAssetsLoaded(){
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
            this._initializeTextures(
                this.FAR_TEXTURE_SETTINGS,
                this.MID_TEXTURE_SETTINGS/*,
                 self.CHARACTER_TEXTURE_SETTINGS*/
            );

            this._initializeSpines();

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
                var texture = this._textureManager.createTextureFromLocalImage(
                    textureSettings.NAME,
                    textureSettings.IMG
                );

                var sprite = this._tilingSpriteManager.createTilingSprite(
                    textureSettings.NAME,
                    texture,
                    textureSettings.WIDTH,
                    textureSettings.HEIGHT
                );

                // Set texture properties based on the settings.
                //sprite.anchor.x = textureSettings.SPRITE_ANCHOR_X || 0.5;
                //sprite.anchor.y = textureSettings.SPRITE_ANCHOR_Y || 0.5;
                sprite.position.x = textureSettings.SPRITE_POSITION_X || 0;
                sprite.position.y = textureSettings.SPRITE_POSITION_Y || 0;
                sprite.tilePosition.x = textureSettings.SPRITE_TILE_POSITION_X || 0;
                sprite.tilePosition.y = textureSettings.SPRITE_TILE_POSITION_Y || 0;

                // Add the sprite to the stage.
                this._stage.addChild(sprite);
            }, this);// Use internal reference as this. Otherwise we will be in another context and "this" will not be a "Game" instance.
        }

        private _initializeSpines(){
            var dragon = new PIXI.Spine(Game.Helpers.Path.resolveAnim('dragonBones'));

            // position the dragon..
            //dragon.position.x = window.innerWidth/2;
            //dragon.position.y = window.innerHeight/2 + (450);

            // set the state of the dragon to its "flying" animation
            // and setting loop to true
            dragon.state.setAnimationByName("flying", true);

            // Add scary dragon to stage.. recoil with fear..
            this._stage.addChild(dragon);
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
            var gameEngine = new Game.Engine.Parallax();

            // Initialize the game.
            gameEngine._initGame();
        }
    }
}