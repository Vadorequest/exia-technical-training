///<reference path='./../../lib/def/defLoader.d.ts'/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var model = require('./Model');

(function (Models) {
    /**
    * Model used to manage the types of the application, a type belongs to a category.
    * The model is primary static, but, to make it easy to use, some things are also stored for each instance.
    * That allows the code to use both Model or instance of Model such as:
    *      Model.schema
    *      model.Schema
    */
    var TypeModel = (function (_super) {
        __extends(TypeModel, _super);
        function TypeModel() {
            _super.apply(this, arguments);
            /**
            * Helpers to always get the property, from instance or static.
            */
            this.modelName = TypeModel.modelName;
            this.schema = TypeModel.schema;
            this.model = TypeModel.model;
        }
        /**
        * Returns the current mongoose.Schema customized instance.
        * All instance methods can be overloaded or written here.
        * @param ChildModel    Child model that made the call.
        * @returns {*}
        * @see http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
        */
        TypeModel.getNewSchemaInstance = function (ChildModel) {
            // Execute the parent changes on the schema.
            var schema = model.Models.Model.getNewSchemaInstance(ChildModel);

            // Overload methods.
            //schema.methods.toObject = function(callback){}
            return schema;
        };
        TypeModel.modelName = 'Type';

        TypeModel.schema = require('../schemas/typeSchema.js');

        TypeModel.indexes = [
            [
                {
                    'name': 1,
                    'category.name': 1
                }, {
                    unique: true
                }]
        ];

        TypeModel.applyMiddleware = function (schema) {
            // Apply the parent middleware.
            schema = model.Models.Model.applyMiddleware(schema);

            return schema;
        };

        TypeModel.Schema = TypeModel.getNewSchemaInstance(TypeModel);

        TypeModel.model = TypeModel.getNewModelInstance(TypeModel);

        TypeModel.TYPES = {
            LANGUAGE_STATUS: {
                ENABLED: 'enabled',
                DISABLED: 'disabled',
                PROCESSING: 'processing'
            },
            ROLE_NAME: {
                SUPER: 'super',
                ADMIN: 'admin',
                MODERATOR: 'moderator',
                TESTER: 'tester',
                GOLD: 'gold',
                PLAYER: 'player'
            },
            TRANSLATION_STATUS: {
                ACCEPTED: 'accepted',
                PENDING: 'pending',
                REFUSED: 'refused'
            }
        };
        return TypeModel;
    })(model.Models.Model);
    Models.TypeModel = TypeModel;

    /**
    * Don't forget that some methods such as exists() are written in the Model class and available for all Models.
    * The following methods belong ONLY to the mongoose model instance, not to the Model class itself!
    *
    *************************************************************************************************
    ******************************** Extended Model methods *****************************************
    *************************************************************************************************
    */
    /**
    * Returns the types.
    * Can return the types for a specific category.
    * @param category
    * @returns {*}
    */
    TypeModel.model.getTypes = function (category) {
        if (typeof category === "undefined") { category = false; }
        if (category && TypeModel.TYPES[category]) {
            return TypeModel.TYPES[category];
        } else {
            return TypeModel.TYPES;
        }
    };
})(exports.Models || (exports.Models = {}));
var Models = exports.Models;
//# sourceMappingURL=TypeModel.js.map
