///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>
///<reference path='./Manager.ts'/>

module Game.Managers {
    /**
     * Manage sprites.
     */
    export class SpriteManager extends Game.Managers.Manager {
        /**
         * Create a Tiling sprite.
         *
         * @param texture
         * @param width
         * @param height
         */
        public createTiling(name: string, texture: Game.Core.Texture, width: number, height: number){
            return this.add(name, Game.Core.TilingSprite).get(name);
        }
    }
}