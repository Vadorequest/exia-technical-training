///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/Sprite.ts'/>
var Game;
(function (Game) {
    var Managers;
    (function (Managers) {
        /**
         * Manage sprites.
         */
        var SpriteManager = (function () {
            function SpriteManager() {
            }
            /**
             * Return a sprite indexed by key.
             * @param key
             * @returns {Sprite}
             */
            SpriteManager.prototype.getSprite = function (key) {
                return typeof this._sprites[key] !== void 0 ? this._sprites[key] : null;
            };
            SpriteManager.prototype.addSprite = function (key, sprite) {
                this._sprites[key] = sprite;
                return this;
            };
            return SpriteManager;
        })();
        Managers.SpriteManager = SpriteManager;
    })(Managers = Game.Managers || (Game.Managers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=SpriteManager.js.map