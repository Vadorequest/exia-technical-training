///<reference path='./def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var dao = require('./../../shared/app/core/lib/CoreDao');

/**
* Use to load all Models. Data Access Object.
* Acts as a Singleton object.
*
* @author  Ambroise Dhenain
*
* @example
*          var User = __Dao.getModel('User');
*          console.log(User);
*          console.log(__Dao.getSchema('User'));
*
*          var minLength = __Dao.getSchema('user').login.minLength;
*/
var Dao = (function (_super) {
    __extends(Dao, _super);
    function Dao() {
        _super.apply(this, arguments);
    }
    return Dao;
})(dao.CoreDao);
exports.Dao = Dao;

(function () {
    /**
    * We change the path of the CoreDao to force to load model files using a custom path for this project.
    */
    Dao.setModelDirectory(path.join(__dirname, "../db/models/"));
})();
//# sourceMappingURL=Dao.js.map
