///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>
///<reference path='./Manager.ts'/>
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
             * Create a Tiling sprite.
             *
             * @param texture
             * @param width
             * @param height
             */
            SpriteManager.prototype.createTiling = function (name, texture, width, height) {
                return this.add(name, Game.Core.TilingSprite).get(name);
            };
            return SpriteManager;
        })(Game.Managers.Manager);
        Managers.SpriteManager = SpriteManager;
    })(Managers = Game.Managers || (Game.Managers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=SpriteManager.js.map