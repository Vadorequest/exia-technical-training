///<reference path='./../defLoader.d.ts' />
///<reference path='./Manager.ts'/>
///<reference path='./../core/Sprite.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Game;
(function (Game) {
    var Managers;
    (function (Managers) {
        /**
         * Manage sprites.
         */
        var SpriteManager = (function (_super) {
            __extends(SpriteManager, _super);
            function SpriteManager() {
                _super.apply(this, arguments);
            }
            /**
             * Return a sprite indexed by the key.
             *
             * @param key
             * @returns {Sprite}
             */
            SpriteManager.prototype.get = function (key) {
                return typeof this._sprites[key] !== void 0 ? this._sprites[key] : null;
            };
            /**
             * Add a sprite, indexed by the key.
             *
             * @param key
             * @param sprite
             * @returns {Game.Managers.SpriteManager}
             */
            SpriteManager.prototype.add = function (key, sprite) {
                this._sprites[key] = sprite;
                return this;
            };
            /**
             * Destroy all registered sprites the hard way.
             */
            SpriteManager.prototype.destroy = function () {
                this._sprites = [];
                return this;
            };
            return SpriteManager;
        })(Game.Managers.Manager);
        Managers.SpriteManager = SpriteManager;
    })(Managers = Game.Managers || (Game.Managers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=SpriteManager.js.map