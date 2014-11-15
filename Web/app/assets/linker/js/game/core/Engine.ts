///<reference path='./../defLoader.d.ts' />
///<reference path='./Layer.ts'/>

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

        private _stage;
        private _renderer;
        private _layers: Game.Core.Layer[];

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

            var farTexture: PIXI.Texture = PIXI.Texture.fromImage("/images/parallax-scroller/bg-far.png");
            farSprite = new PIXI.TilingSprite(
                farTexture,
                512, 256
            );
            farSprite.position.x = 0;
            farSprite.position.y = 0;
            farSprite.tilePosition.x = 0;
            farSprite.tilePosition.y = 0;
            stage.addChild(farSprite);// Adding the farSprite to the stage.

            var midTexture: PIXI.Texture = PIXI.Texture.fromImage("/images/parallax-scroller/bg-mid.png");
            midSprite = new PIXI.TilingSprite(
                midTexture,
                512, 256
            );
            midSprite.position.x = 0;
            midSprite.position.y = 128;
            midSprite.tilePosition.x = 0;
            midSprite.tilePosition.y = 0;
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
            farSprite.tilePosition.x -= 0.128;
            midSprite.tilePosition.x -= 0.64;

            // Render the stage. Basically refresh the canvas content.
            renderer.render(stage);

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
            // Initialize the game.
            var init = new Game.Core.Engine()._initGame();
        }
    }
}