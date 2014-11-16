///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>
///<reference path='./../helpers/def/defLoader.d.ts'/>
///<reference path='./Manager.ts'/>

module Game.Managers {
    export class TextureManager extends Game.Managers.Manager {

        /**
         * Elements that are managed by the manager.
         * @override
         */
        protected _elements: Game.Core.Texture[];

        /**
         * Create a texture based on an image path relative to our application.
         *
         * @param name              Name used as reference in the manager.
         * @param relativePath      Relative path, or filename, from the game image folder.
         * @param imgExt            Extension of the image to load. [png]
         * @returns {Game.Core.Texture}
         */
        public createTextureFromLocalImage(name: string, relativePath: string, imgExt: string = 'png'): Game.Core.Texture{
            return this.add(name, Game.Core.Texture.fromImage(Game.Helpers.Path.IMAGES_PATH + relativePath + '.' + imgExt)).get(name);
        }
    }
}