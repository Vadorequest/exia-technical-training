///<reference path='./../defLoader.d.ts' />
///<reference path='./Manager.ts'/>
///<reference path='./../core/Sprite.ts'/>

module Game.Managers {
    /**
     * Manage sprites.
     */
    export class SpriteManager extends Game.Managers.Manager{
        private _sprites: Game.Core.Sprite[];

        /**
         * Return a sprite indexed by the key.
         *
         * @param key
         * @returns {Sprite}
         */
        public get(key: string): any{
            return typeof this._sprites[key] !== void 0 ? this._sprites[key] : null;
        }

        /**
         * Add a sprite, indexed by the key.
         *
         * @param key
         * @param sprite
         * @returns {Game.Managers.SpriteManager}
         */
        public add(key: string, sprite): SpriteManager{
            this._sprites[key] = sprite;

            return this;
        }

        /**
         * Destroy all registered sprites the hard way.
         */
        public destroy(){
            this._sprites = [];

            return this;
        }
    }
}