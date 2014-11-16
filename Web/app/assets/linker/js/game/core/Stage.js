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
        var Stage = (function (_super) {
            __extends(Stage, _super);
            function Stage() {
                _super.apply(this, arguments);
            }
            return Stage;
        })(PIXI.Stage);
        Core.Stage = Stage;
    })(Core = Game.Core || (Game.Core = {}));
})(Game || (Game = {}));
//# sourceMappingURL=Stage.js.map