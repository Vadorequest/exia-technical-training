///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>
///<reference path='./Manager.ts'/>

module Game.Managers {
    export class TextureManager extends Game.Managers.Manager {

        /**
         * Elements that are managed by the manager.
         * @override
         */
        protected _elements: Game.Core.Texture[] = [];

        public createTextureFromLocalImage(name: string, relativePath: string, imgExt: string = 'png'): Game.Core.Texture{
            return this.add(name, Game.Core.Texture.fromImage("/images/game/" + relativePath + '.' + imgExt)).get(name);
        }
    }
}