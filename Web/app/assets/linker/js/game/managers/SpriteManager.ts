///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/Sprite.ts'/>

module Game.Managers {
    /**
     * Manage sprites.
     */
    export class SpriteManager {
        private _sprites: any;//Game.Core.Sprite[];

        /**
         * Return a sprite indexed by key.
         * @param key
         * @returns {Sprite}
         */
        public getSprite(key: string){
            return typeof this._sprites[key] !== void 0 ? this._sprites[key] : null;
        }

        public addSprite(key: string, sprite): SpriteManager{
            this._sprites[key] = sprite;

            return this;
        }
    }
}