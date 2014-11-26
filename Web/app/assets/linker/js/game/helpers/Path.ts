///<reference path='./../defLoader.d.ts' />

module Game.Helpers {
    export class Path{
        /**
         * Separator used to separate paths.
         * @type {string}
         */
        public static SEP = '/';

        /**
         * Relative path from the root folder for all kind of resources (images,
         * @type {string}
         */
        public static RESOURCES_PATH: string = '/linker/js/game/resources/';

        /**
         * Name of the sprite folder.
         * @type {string}
         */
        public static SPRITES_FOLDER: string = 'sprites';

        /**
         * Name of the sprite folder.
         * @type {string}
         */
        public static IMAGES_FOLDER: string = 'images';

        /**
         * Sprites relative path from root.
         * @type {string}
         */
        public static SPRITES_PATH: string = Path.RESOURCES_PATH + Path.SPRITES_FOLDER + Path.SEP;

        /**
         * Images relative path from root.
         * @type {string}
         */
        public static IMAGES_PATH: string = Path.RESOURCES_PATH + Path.IMAGES_FOLDER + Path.SEP;

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
        public static resolveSprite(sprite: string, ext: string = 'json'){
            return Path.SPRITES_PATH + sprite + '.' + ext;
        }

        /**
         * Resolve an image path and returns the path.
         *
         * @param img   Image name.
         * @param ext   Extension. [png]
         * @returns {string}
         */
        public static resolveImage(img: string, ext: string = 'png'){
            return Path.IMAGES_PATH + img + '.' + ext;
        }

    }
}