///<reference path='./lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
define(["require", "exports", './public/View'], function (require, exports, _view) {
    /**
     * Methods for the view, server side only.
     */
    var View = (function (_super) {
        __extends(View, _super);
        function View() {
            _super.apply(this, arguments);
        }
        /**
         * Return the path of a template using absolute path, based on the global public config. (Because the same path is shared with the client, templates are also accessible from the client.)
         *
         * @param filename              Filename to get the path from.
         * @param beforeFilename        Pattern to add before the filename. ['_']
         * @returns {string}
         */
        View.templatePath = function (filename, beforeFilename) {
            if (beforeFilename === void 0) { beforeFilename = '_'; }
            return '/../../' + getPublicConfig().path.view.templates + beforeFilename + filename;
        };
        /**
         * Return the path of a partial using absolute path, based on the global config.
         *
         * @param filename              Filename to get the path from.
         * @param beforeFilename        Pattern to add before the filename. ['_']
         * @returns {string}
         */
        View.partialPath = function (filename, beforeFilename) {
            if (beforeFilename === void 0) { beforeFilename = '_'; }
            return __config.path.view.partials + beforeFilename + filename;
        };
        return View;
    })(_view.View);
    exports.View = View;
});
//# sourceMappingURL=View.js.map