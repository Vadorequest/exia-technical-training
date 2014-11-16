///<reference path='./../defLoader.d.ts' />
///<reference path='./../managers/def/defLoader.d.ts' />
var Game;
(function (Game) {
    var Core;
    (function (Core) {
        /**
         * Public class used to setup the game.
         */
        var Engine = (function () {
            /**
             **************************************************************************************************
             **************************************** Public methods ******************************************
             **************************************************************************************************
             */
            /**
             * Constructor.
             * Initialize managers.
             */
            function Engine() {
                /**
                 **************************************************************************************************
                 **************************************** Constants ***********************************************
                 **************************************************************************************************
                 */
                this.FAR_TEXTURE_SETTINGS = {
                    NAME: 'far',
                    IMG: 'bg-far',
                    WIDTH: 512,
                    HEIGHT: 256,
                    SPEED: 0.128
                };
                this.MID_TEXTURE_SETTINGS = {
                    NAME: 'mid',
                    IMG: 'bg-mid',
                    WIDTH: 512,
                    HEIGHT: 256,
                    SPEED: 0.64
                };
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
            Engine.prototype._initGame = function () {
                consoleDev('Initializing the game... ', 'debug');
                this._stage = new PIXI.Stage(0x222222);
                this._renderer = PIXI.autoDetectRenderer($('#game').width(), $('#game').height());
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
                this._stage.addChild(farSprite); // Add the farSprite to the stage.
                var midTexture = this._textureManager.createTextureFromLocalImage(this.MID_TEXTURE_SETTINGS.NAME, this.MID_TEXTURE_SETTINGS.IMG);
                var midSprite = this._tilingSpriteManager.createTilingSprite(this.MID_TEXTURE_SETTINGS.NAME, midTexture, this.MID_TEXTURE_SETTINGS.WIDTH, this.MID_TEXTURE_SETTINGS.HEIGHT);
                midSprite.position.x = 0;
                midSprite.position.y = 128;
                midSprite.tilePosition.x = 0;
                midSprite.tilePosition.y = 0;
                this._stage.addChild(midSprite); // Add the midSprite to the stage.
                var self = this;
                requestAnimFrame(function () {
                    self._update();
                });
                consoleDev('The game has been started. ', 'debug');
            };
            /**
             * Update the canvas and calls itself indefinitely.
             * @private
             */
            Engine.prototype._update = function () {
                this._tilingSpriteManager.get(this.FAR_TEXTURE_SETTINGS.NAME).decreaseTilePosition(this.FAR_TEXTURE_SETTINGS.SPEED);
                this._tilingSpriteManager.get(this.MID_TEXTURE_SETTINGS.NAME).increaseTilePosition(this.MID_TEXTURE_SETTINGS.SPEED);
                // Render the stage. Basically refresh the canvas content.
                this._renderer.render(this._stage);
                var self = this;
                requestAnimFrame(function () {
                    self._update();
                });
            };
            /**
             **************************************************************************************************
             **************************************** Public static methods ***********************************
             **************************************************************************************************
             */
            /**
             * Public static method, accessible from the client to start the game init process.
             */
            Engine.initialize = function () {
                var gameEngine = new Game.Core.Engine();
                // Initialize the game.
                gameEngine._initGame();
            };
            return Engine;
        })();
        Core.Engine = Engine;
    })(Core = Game.Core || (Game.Core = {}));
})(Game || (Game = {}));
//# sourceMappingURL=Engine.js.map