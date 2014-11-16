///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>
///<reference path='./Manager.ts'/>

module Game.Managers {
    export class TilingSpriteManager extends Game.Managers.Manager {

        /**
         * Elements that are managed by the manager.
         * @override
         */
        protected _elements: Game.Core.TilingSprite[] = [];

        /**
         * Create a Tiling sprite.
         *
         * @param name      Sprite's name.
         * @param texture   Texture to use.
         * @param width
         * @param height
         */
        public createTilingSprite(name: string, texture: Game.Core.Texture, width: number, height: number){
            return this.add(name, new Game.Core.TilingSprite(texture, width, height)).get(name);
        }
    }
}