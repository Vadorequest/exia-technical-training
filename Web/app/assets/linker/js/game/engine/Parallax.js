///<reference path='./../defLoader.d.ts' />
///<reference path='./../managers/def/defLoader.d.ts' />
var Game;
(function (Game) {
    var Engine;
    (function (Engine) {
        /**
         * Public class used to setup the game.
         */
        var Parallax = (function () {
            /**
             **************************************************************************************************
             **************************************** Public methods ******************************************
             **************************************************************************************************
             */
            /**
             * Constructor.
             * Initialize managers.
             */
            function Parallax() {
                /**
                 **************************************************************************************************
                 **************************************** Constants ***********************************************
                 **************************************************************************************************
                 */
                /**
                 * Canvas ID in the DOM that will display the game.
                 * @type {string}
                 */
                this.CANVAS_ID = 'game';
                /**
                 * Settings for the FAR texture, displayed as final background.
                 * @type {{NAME: string, IMG: string, WIDTH: number, HEIGHT: number, SPEED: number}}
                 */
                this.FAR_TEXTURE_SETTINGS = {
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
                this.MID_TEXTURE_SETTINGS = {
                    NAME: 'mid',
                    IMG: 'bg-mid',
                    WIDTH: 512,
                    HEIGHT: 256,
                    SPEED: 0.64,
                    SPRITE_POSITION_Y: 128
                };
                /**
                 * Assets to load before to start the game.
                 *
                 * @type {string[]}
                 * @private
                 */
                this._assetsToLoad = [
                    Game.Helpers.Path.resolveSprite('wall'),
                    Game.Helpers.Path.resolveImage('bg-mid'),
                    Game.Helpers.Path.resolveImage('bg-far')
                ];
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
            Parallax.prototype._initGame = function () {
                consoleDev('Initializing the game... ', 'debug');
                // Load all our assets. Once it's done then start the game.
                Game.Core.AssetLoader.loadAssets(this._assetsToLoad, function (self) {
                    self._stage = new Game.Core.Stage(0x222222);
                    self._renderer = PIXI.autoDetectRenderer($('#game').width(), $('#game').height());
                    // Set the canvas id. We basically replace the skeleton.
                    self._renderer.view.id = self.CANVAS_ID;
                    // Append the rendered view to the DOM.
                    $('#game').replaceWith(self._renderer.view);
                    // Initialize textures. Order count, last added will be on top of previous textures.
                    self._initializeTextures(self.FAR_TEXTURE_SETTINGS, self.MID_TEXTURE_SETTINGS);
                    self._requestAnimFrame();
                    consoleDev('The game has been started. ', 'debug');
                }, this);
            };
            /**
             * Initialize all textures.
             *
             * @param texturesSettings
             * @private
             */
            Parallax.prototype._initializeTextures = function () {
                var texturesSettings = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    texturesSettings[_i - 0] = arguments[_i];
                }
                _.each(texturesSettings, function (textureSettings) {
                    var farTexture = this._textureManager.createTextureFromLocalImage(textureSettings.NAME, textureSettings.IMG);
                    var farSprite = this._tilingSpriteManager.createTilingSprite(textureSettings.NAME, farTexture, textureSettings.WIDTH, textureSettings.HEIGHT);
                    // Set texture properties based on the settings.
                    farSprite.position.x = textureSettings.SPRITE_POSITION_X || 0;
                    farSprite.position.y = textureSettings.SPRITE_POSITION_Y || 0;
                    farSprite.tilePosition.x = textureSettings.SPRITE_TILE_POSITION_X || 0;
                    farSprite.tilePosition.y = textureSettings.SPRITE_TILE_POSITION_Y || 0;
                    // Add the farSprite to the stage.
                    this._stage.addChild(farSprite);
                }, this); // Use internal reference as this. Otherwise we will be in another context and "this" will not be a "Game" instance.
            };
            /**
             * Refresh the rendered content.
             * @private
             */
            Parallax.prototype._requestAnimFrame = function () {
                var self = this;
                requestAnimFrame(function () {
                    self._update();
                });
            };
            /**
             * Update the canvas and calls itself indefinitely.
             * @private
             */
            Parallax.prototype._update = function () {
                this._tilingSpriteManager.get(this.FAR_TEXTURE_SETTINGS.NAME).decreaseTilePosition(this.FAR_TEXTURE_SETTINGS.SPEED);
                this._tilingSpriteManager.get(this.MID_TEXTURE_SETTINGS.NAME).increaseTilePosition(this.MID_TEXTURE_SETTINGS.SPEED);
                // Render the stage. Basically refresh the canvas content.
                this._renderer.render(this._stage);
                // Infinite loop that will refresh the rendered content on each loop.
                this._requestAnimFrame();
            };
            /**
             **************************************************************************************************
             **************************************** Public static methods ***********************************
             **************************************************************************************************
             */
            /**
             * Public static method, accessible from the client to start the game init process.
             */
            Parallax.initialize = function () {
                var gameEngine = new Game.Engine.Parallax();
                // Initialize the game.
                gameEngine._initGame();
            };
            return Parallax;
        })();
        Engine.Parallax = Parallax;
    })(Engine = Game.Engine || (Game.Engine = {}));
})(Game || (Game = {}));
//# sourceMappingURL=Parallax.js.map