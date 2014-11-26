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
         * Name of the sprites folder.
         * @type {string}
         */
        public static SPRITES_FOLDER: string = 'sprites';

        /**
         * Name of the images folder.
         * @type {string}
         */
        public static IMAGES_FOLDER: string = 'images';

        /**
         * Name of the animations folder.
         * @type {string}
         */
        public static ANIMATIONS_FOLDER: string = 'anim';

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
         * Animations relative path from root.
         * @type {string}
         */
        public static ANIMATIONS_PATH: string = Path.RESOURCES_PATH + Path.ANIMATIONS_FOLDER + Path.SEP;

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

        /**
         * Resolve an animation path and returns the path.
         *
         * @param anim  Animation name.
         * @param ext   Extension. [anim]
         * @returns {string}
         */
        public static resolveAnim(anim: string, ext: string = 'anim'){
            return Path.ANIMATIONS_PATH + anim + '.' + ext;
        }

    }
}