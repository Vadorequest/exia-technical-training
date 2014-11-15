///<reference path='./../lib/def/defLoader.d.ts'/>
/// <reference path='Init.ts' />
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", "Init"], function (require, exports, init) {
    /**
     * Init the view/main.
     */
    var InitDefault = (function (_super) {
        __extends(InitDefault, _super);
        /**
         * Run the base level initialization by calling its parent.
         *
         * @param config            Config object.
         * @param languages         All languages and config. Doesn't contains the texts, only config.
         * @param defaultLanguage   The entire default language.
         */
        function InitDefault(config, languages, defaultLanguage) {
            _super.call(this, config, languages, defaultLanguage);
            // Starts the game.
            Game.Core.Engine.initialize();
        }
        return InitDefault;
    })(init.Init);
    exports.InitDefault = InitDefault;
});
//# sourceMappingURL=InitDefault.js.map