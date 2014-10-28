/// <reference path='Init.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Init"], function(require, exports, init) {
    /**
    * Init the view/main.
    */
    var InitDefault = (function (_super) {
        __extends(InitDefault, _super);
        /**
        * Run the base level initialization by calling its parent.
        *
        * @param config            Config object.
        * @param languages         All languages and config. Doesn't contains the texts, only config.
        * @param defaultLanguage   The entire default language.
        */
        function InitDefault(config, languages, defaultLanguage) {
            _super.call(this, config, languages, defaultLanguage);
            this._custom();
        }
        /**
        * Custom function to initialize specific stuff for this page.
        * @private
        */
        InitDefault.prototype._custom = function () {
            consoleDev('Custom home initialization starting...', 'debug');
            this._initGame();
            consoleDev('Custom home initialization done with success.', 'debug');
        };

        /**
        * Initialize Game canvas.
        * @private
        */
        InitDefault.prototype._initGame = function () {
            consoleDev('Initializing Pixi. ', 'debug');

            stage = new PIXI.Stage(0x222222);
            renderer = PIXI.autoDetectRenderer($('#game').width(), $('#game').height());

            // Set the canvas id. We basically replace the skeleton.
            renderer.view.id = "game";

            // Append the rendered view to the DOM.
            $('#game').replaceWith(renderer.view);

            var farTexture = PIXI.Texture.fromImage("/images/parallax-scroller/bg-far.png");
            farSprite = new PIXI.TilingSprite(farTexture, 512, 256);
            farSprite.position.x = 0;
            farSprite.position.y = 0;
            farSprite.tilePosition.x = 0;
            farSprite.tilePosition.y = 0;
            stage.addChild(farSprite); // Adding the farSprite to the stage.

            var midTexture = PIXI.Texture.fromImage("/images/parallax-scroller/bg-mid.png");
            midSprite = new PIXI.TilingSprite(midTexture, 512, 256);
            midSprite.position.x = 0;
            midSprite.position.y = 128;
            midSprite.tilePosition.x = 0;
            midSprite.tilePosition.y = 0;
            stage.addChild(midSprite); // Adding the midSprite to the stage.

            var self = this;
            requestAnimFrame(function () {
                self._update();
            });

            consoleDev('Pixi has been initialized and the canvas has been refreshed. ', 'debug');
        };

        /**
        * Update the canvas and calls itself indefinitely.
        * @private
        */
        InitDefault.prototype._update = function () {
            farSprite.tilePosition.x -= 0.128;
            midSprite.tilePosition.x -= 0.64;

            // Render the stage. Basically refresh the canvas content.
            renderer.render(stage);

            var self = this;
            requestAnimFrame(function () {
                self._update();
            });
        };
        return InitDefault;
    })(init.Init);
    exports.InitDefault = InitDefault;
});
//# sourceMappingURL=InitDefault.js.map
