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
        var AssetLoader = (function (_super) {
            __extends(AssetLoader, _super);
            function AssetLoader() {
                _super.apply(this, arguments);
            }
            /**
             * Load assets and execute the onComplete callback once it's loaded.
             *
             * @param assets
             * @param onComplete
             * @returns {Game.Core.AssetLoader}
             */
            AssetLoader.loadAssets = function (assets, onComplete, context) {
                var loader = new AssetLoader(assets);
                loader.onComplete = onComplete(context);
                loader.load();
                return loader;
            };
            return AssetLoader;
        })(PIXI.AssetLoader);
        Core.AssetLoader = AssetLoader;
    })(Core = Game.Core || (Game.Core = {}));
})(Game || (Game = {}));
//# sourceMappingURL=AssetLoader.js.map