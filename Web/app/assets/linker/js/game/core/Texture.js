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
        var Texture = (function (_super) {
            __extends(Texture, _super);
            function Texture() {
                _super.apply(this, arguments);
            }
            return Texture;
        })(PIXI.Texture);
        Core.Texture = Texture;
    })(Core = Game.Core || (Game.Core = {}));
})(Game || (Game = {}));
//# sourceMappingURL=Texture.js.map