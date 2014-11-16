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
                var farTexture = this._textureManager.createTextureFromLocalImage('far', 'bg-far');
                var farSprite = this._tilingSpriteManager.createTilingSprite('far', farTexture, 512, 256);
                farSprite.position.x = 0;
                farSprite.position.y = 0;
                farSprite.tilePosition.x = 0;
                farSprite.tilePosition.y = 0;
                this._stage.addChild(farSprite); // Add the farSprite to the stage.
                var midTexture = this._textureManager.createTextureFromLocalImage('mid', 'bg-mid');
                var midSprite = this._tilingSpriteManager.createTilingSprite('mid', midTexture, 512, 256);
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
                this._tilingSpriteManager.get('far').decreaseTilePosition(0.128);
                this._tilingSpriteManager.get('mid').increaseTilePosition(0.64);
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