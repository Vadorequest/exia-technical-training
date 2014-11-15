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
        var TextureManager = (function (_super) {
            __extends(TextureManager, _super);
            function TextureManager() {
                _super.apply(this, arguments);
            }
            TextureManager.prototype.createFromLocalImage = function (name, relativePath) {
                return this.add(name, Game.Core.Texture.fromImage("/" + relativePath)).get(name);
            };
            return TextureManager;
        })(Game.Managers.Manager);
        Managers.TextureManager = TextureManager;
    })(Managers = Game.Managers || (Game.Managers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=TextureManager.js.map