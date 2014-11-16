///<reference path='./../defLoader.d.ts' />

module Game.Core {
    export class TilingSprite extends PIXI.TilingSprite {

        /**
         * Update the tile position.
         *
         * @param x     If set, will change the x position.
         * @param y     If set, will change the y position.
         * @returns {Game.Core.TilingSprite}
         */
        public updateTilePosition(x: number = null, y: number = null): TilingSprite{
            if(x){
                this.tilePosition.x = x;
            }

            if(y){
                this.tilePosition.y = y;
            }

            return this;
        }

        /**
         * Decrease the tile position based on the current value.
         *
         * @param x     If set, will decrease the x position.
         * @param y     If set, will decrease the y position.
         * @returns {Game.Core.TilingSprite}
         */
        public decreaseTilePosition(x: number = null, y: number = null): TilingSprite{
            if(x){
                this.tilePosition.x -= x;
            }

            if(y){
                this.tilePosition.y -= y;
            }

            return this;
        }

        /**
         * Increase the tile position based on the current value.
         *
         * @param x     If set, will increase the x position.
         * @param y     If set, will increase the y position.
         * @returns {Game.Core.TilingSprite}
         */
        public increaseTilePosition(x: number = null, y: number = null): TilingSprite{
            if(x){
                this.tilePosition.x += x;
            }

            if(y){
                this.tilePosition.y += y;
            }

            return this;
        }
    }
}