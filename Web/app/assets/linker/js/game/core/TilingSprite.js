///<reference path='./../defLoader.d.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    var Core;
    (function (Core) {
        var TilingSprite = (function (_super) {
            __extends(TilingSprite, _super);
            function TilingSprite() {
                _super.apply(this, arguments);
            }
            /**
             * Update the tile position.
             *
             * @param x     If set, will change the x position.
             * @param y     If set, will change the y position.
             * @returns {Game.Core.TilingSprite}
             */
            TilingSprite.prototype.updateTilePosition = function (x, y) {
                if (x === void 0) { x = null; }
                if (y === void 0) { y = null; }
                if (x) {
                    this.tilePosition.x = x;
                }
                if (y) {
                    this.tilePosition.y = y;
                }
                return this;
            };
            /**
             * Decrease the tile position based on the current value.
             *
             * @param x     If set, will decrease the x position.
             * @param y     If set, will decrease the y position.
             * @returns {Game.Core.TilingSprite}
             */
            TilingSprite.prototype.decreaseTilePosition = function (x, y) {
                if (x === void 0) { x = null; }
                if (y === void 0) { y = null; }
                if (x) {
                    this.tilePosition.x -= x;
                }
                if (y) {
                    this.tilePosition.y -= y;
                }
                return this;
            };
            /**
             * Increase the tile position based on the current value.
             *
             * @param x     If set, will increase the x position.
             * @param y     If set, will increase the y position.
             * @returns {Game.Core.TilingSprite}
             */
            TilingSprite.prototype.increaseTilePosition = function (x, y) {
                if (x === void 0) { x = null; }
                if (y === void 0) { y = null; }
                if (x) {
                    this.tilePosition.x += x;
                }
                if (y) {
                    this.tilePosition.y += y;
                }
                return this;
            };
            return TilingSprite;
        })(PIXI.TilingSprite);
        Core.TilingSprite = TilingSprite;
    })(Core = Game.Core || (Game.Core = {}));
})(Game || (Game = {}));
//# sourceMappingURL=TilingSprite.js.map