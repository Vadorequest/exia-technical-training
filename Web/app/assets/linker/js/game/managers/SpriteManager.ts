///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>
///<reference path='./Manager.ts'/>

module Game.Managers {
    export class SpriteManager extends Game.Managers.Manager {

        /**
         * Elements that are managed by the manager.
         * @override
         */
        protected _elements: Game.Core.Sprite[] = [];

        /**
         * Create a Tiling sprite.
         *
         * @param texture
         * @param width
         * @param height
         */
        //public createSprite(name: string, texture: Game.Core.Texture, width: number, height: number){
        //    return this.add(name, Game.Core.TilingSprite).get(name);
        //}
    }
}