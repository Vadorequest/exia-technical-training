///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>
///<reference path='./Manager.ts'/>

module Game.Managers {
    export class TextureManager extends Game.Managers.Manager {

        public createFromLocalImage(name: string, relativePath: string): Game.Core.Texture{
            return this.add(name, Game.Core.Texture.fromImage("/" + relativePath)).get(name);
        }
    }
}