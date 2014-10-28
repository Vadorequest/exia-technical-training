///<reference path='./lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './public/Lang'], function(require, exports, lang) {
    

    /**
    * Manage all the languages server side.
    */
    var Lang = (function (_super) {
        __extends(Lang, _super);
        /**
        * Basically run the init method.
        * @param config            The public server config.
        * @param languages         The public JSON languages config file.
        * @param defaultLanguage   The public JSON language text file to use as default an main language.
        * @param message           Instance of the Message class, for the communication.
        */
        function Lang(config, languages, defaultLanguage) {
            _super.call(this, config, languages, defaultLanguage, false);
        }
        return Lang;
    })(lang.Lang);
    exports.Lang = Lang;
});
//# sourceMappingURL=Lang.js.map
