///<reference path='./../defLoader.d.ts' />
var Game;
(function (Game) {
    var Helpers;
    (function (Helpers) {
        var Path = (function () {
            function Path() {
            }
            /**
             **************************************************************************************************
             **************************************** Public static methods ***********************************
             **************************************************************************************************
             */
            /**
             * Resolve a sprite path and returns the path.
             *
             * @param sprite    Sprite name.
             * @param ext   Extension. [json]
             * @returns {string}
             */
            Path.resolveSprite = function (sprite, ext) {
                if (ext === void 0) { ext = 'json'; }
                return Path.SPRITES_PATH + sprite + '.' + ext;
            };
            /**
             * Resolve an image path and returns the path.
             *
             * @param img   Image name.
             * @param ext   Extension. [png]
             * @returns {string}
             */
            Path.resolveImage = function (img, ext) {
                if (ext === void 0) { ext = 'png'; }
                return Path.IMAGES_PATH + img + '.' + ext;
            };
            /**
             * Separator used to separate paths.
             * @type {string}
             */
            Path.SEP = '/';
            /**
             * Relative path from the root folder for all kind of resources (images,
             * @type {string}
             */
            Path.RESOURCES_PATH = '/linker/js/game/resources/';
            /**
             * Name of the sprite folder.
             * @type {string}
             */
            Path.SPRITES_FOLDER = 'sprites';
            /**
             * Name of the sprite folder.
             * @type {string}
             */
            Path.IMAGES_FOLDER = 'images';
            /**
             * Sprites relative path from root.
             * @type {string}
             */
            Path.SPRITES_PATH = Path.RESOURCES_PATH + Path.SPRITES_FOLDER + Path.SEP;
            /**
             * Images relative path from root.
             * @type {string}
             */
            Path.IMAGES_PATH = Path.RESOURCES_PATH + Path.IMAGES_FOLDER + Path.SEP;
            return Path;
        })();
        Helpers.Path = Path;
    })(Helpers = Game.Helpers || (Game.Helpers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=Path.js.map