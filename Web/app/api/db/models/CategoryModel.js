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
    * Model used to manage the categories of the application.
    * The model is primary static, but, to make it easy to use, some things are also stored for each instance.
    * That allows the code to use both Model or instance of Model such as:
    *      Model.schema
    *      model.Schema
    */
    var CategoryModel = (function (_super) {
        __extends(CategoryModel, _super);
        function CategoryModel() {
            _super.apply(this, arguments);
            /**
            * Helpers to always get the property, from instance or static.
            */
            this.modelName = CategoryModel.modelName;
            this.schema = CategoryModel.schema;
            this.model = CategoryModel.model;
        }
        /**
        * Returns the current mongoose.Schema customized instance.
        * All instance methods can be overloaded or written here.
        * @param ChildModel    Child model that made the call.
        * @returns {*}
        * @see http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
        */
        CategoryModel.getNewSchemaInstance = function (ChildModel) {
            // Execute the parent changes on the schema.
            var schema = model.Models.Model.getNewSchemaInstance(ChildModel);

            // Overload methods.
            //schema.methods.toObject = function(callback){}
            return schema;
        };
        CategoryModel.modelName = 'Category';

        CategoryModel.schema = require('../schemas/categorySchema.js');

        CategoryModel.indexes = [];

        CategoryModel.applyMiddleware = function (schema) {
            // Apply the parent middleware.
            schema = model.Models.Model.applyMiddleware(schema);

            schema.pre('validate', function (next) {
                var now = new Date();

                this.updatedAt = now;

                if (!this.created_at) {
                    this.createdAt = now;
                }

                next();
            });

            return schema;
        };

        CategoryModel.Schema = CategoryModel.getNewSchemaInstance(CategoryModel);

        CategoryModel.model = CategoryModel.getNewModelInstance(CategoryModel);

        CategoryModel.CATEGORIES = {
            ACCESS_NAME: 'accessName',
            LANGUAGE_STATUS: 'languageStatus',
            ROLE_NAME: 'roleName',
            TRANSLATION_STATUS: 'translationStatus'
        };
        return CategoryModel;
    })(model.Models.Model);
    Models.CategoryModel = CategoryModel;

    /**
    * Don't forget that some methods such as exists() are written in the Model class and available for all Models.
    * The following methods belong ONLY to the mongoose model instance, not to the Model class itself!
    *
    *************************************************************************************************
    ******************************** Extended Model methods *****************************************
    *************************************************************************************************
    */
    CategoryModel.model.getCategories = function (category) {
        if (typeof category === "undefined") { category = false; }
        if (category && CategoryModel.CATEGORIES[category]) {
            return CategoryModel.CATEGORIES[category];
        } else {
            return CategoryModel.CATEGORIES;
        }
    };
})(exports.Models || (exports.Models = {}));
var Models = exports.Models;
//# sourceMappingURL=CategoryModel.js.map
