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
        var SpriteManager = (function (_super) {
            __extends(SpriteManager, _super);
            function SpriteManager() {
                _super.apply(this, arguments);
                /**
                 * Elements that are managed by the manager.
                 * @override
                 */
                this._elements = [];
            }
            return SpriteManager;
        })(Game.Managers.Manager);
        Managers.SpriteManager = SpriteManager;
    })(Managers = Game.Managers || (Game.Managers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=SpriteManager.js.map