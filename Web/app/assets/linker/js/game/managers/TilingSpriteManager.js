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
        var TilingSpriteManager = (function (_super) {
            __extends(TilingSpriteManager, _super);
            function TilingSpriteManager() {
                _super.apply(this, arguments);
            }
            /**
             * Create a Tiling sprite.
             *
             * @param name      Sprite's name.
             * @param texture   Texture to use.
             * @param width
             * @param height
             */
            TilingSpriteManager.prototype.createTilingSprite = function (name, texture, width, height) {
                return this.add(name, new Game.Core.TilingSprite(texture, width, height)).get(name);
            };
            return TilingSpriteManager;
        })(Game.Managers.Manager);
        Managers.TilingSpriteManager = TilingSpriteManager;
    })(Managers = Game.Managers || (Game.Managers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=TilingSpriteManager.js.map