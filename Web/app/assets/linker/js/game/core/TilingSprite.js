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
            return TilingSprite;
        })(PIXI.TilingSprite);
        Core.TilingSprite = TilingSprite;
    })(Core = Game.Core || (Game.Core = {}));
})(Game || (Game = {}));
//# sourceMappingURL=TilingSprite.js.map