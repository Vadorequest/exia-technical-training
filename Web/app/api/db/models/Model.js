///<reference path='./../../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var model = require('./../../../shared/app/core/models/CoreModel');

/**
* Package that contains all Models used to interact with the database.
*/
(function (Models) {
    /**
    * Our own implementation of the super model that all model inherits.
    */
    var Model = (function (_super) {
        __extends(Model, _super);
        function Model() {
            _super.apply(this, arguments);
        }
        return Model;
    })(model.CoreModels.Model);
    Models.Model = Model;

    /**
    * Our own implementation of the MongoDb errors manager, used statically.
    */
    var MongoError = (function (_super) {
        __extends(MongoError, _super);
        function MongoError() {
            _super.apply(this, arguments);
        }
        return MongoError;
    })(model.CoreModels.MongoError);
    Models.MongoError = MongoError;

    
})(exports.Models || (exports.Models = {}));
var Models = exports.Models;
//# sourceMappingURL=Model.js.map
