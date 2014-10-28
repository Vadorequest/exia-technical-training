///<reference path='./../../lib/def/defLoader.d.ts'/>

import model = require('./Model');

export module Models {
    /**
     * Model used to manage the categories of the application.
     * The model is primary static, but, to make it easy to use, some things are also stored for each instance.
     * That allows the code to use both Model or instance of Model such as:
     *      Model.schema
     *      model.Schema
     */
    export class CategoryModel extends model.Models.Model implements model.Models.IModel{
        /**
         *************************************************************************************************
         ****************************** Public methods & attributes **************************************
         *************************************************************************************************
         */

        /**
         * Name of the model.
         * MUST start by uppercase letter!
         */
        public static modelName: string = 'Category';

        /**
         * Readable schema as object.
         */
        public static schema: any = require('../schemas/categorySchema.js');

        /**
         * Object that contains all the indexes configuration to apply when a schema is created.
         * The first object contains the fields.
         * The second object contains the field options.
         * @see http://mongoosejs.com/docs/api.html#schema_Schema-index
         */
        public static indexes: any = [];

        /**
         * Source code executed to modify the mongoose Schema middleware.
         * @see http://mongoosejs.com/docs/middleware.html
         */
        public static applyMiddleware = function(schema: mongoose.Schema){
            // Apply the parent middleware.
            schema = model.Models.Model.applyMiddleware(schema);

            schema.pre('validate', function(next){
                var now = new Date();

                this.updatedAt = now;

                if ( !this.created_at ) {
                    this.createdAt = now;
                }

                next();
            });

            return schema;
        };

        /**
         * Returns the current mongoose.Schema customized instance.
         * All instance methods can be overloaded or written here.
         * @param ChildModel    Child model that made the call.
         * @returns {*}
         * @see http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
         */
        public static getNewSchemaInstance(ChildModel: any): mongoose.Schema{
            // Execute the parent changes on the schema.
            var schema: any = model.Models.Model.getNewSchemaInstance(ChildModel);

            // Overload methods.
            //schema.methods.toObject = function(callback){}

            return schema;
        }

        /**
         * Schema as mongoose Schema type.
         */
        public static Schema: mongoose.Schema = CategoryModel.getNewSchemaInstance(CategoryModel);

        /**
         * The mongoose Model that uses the mongoose schema.
         */
        public static model: any = CategoryModel.getNewModelInstance(CategoryModel);

        /**
         * Helpers to always get the property, from instance or static.
         */
        public modelName: string = CategoryModel.modelName;
        public schema: mongoose.Schema = CategoryModel.schema;
        public model: mongoose.Model<any> = CategoryModel.model;

        /**
         *************************************************************************************************
         ***************************** Extended methods & attributes **************************************
         *************************************************************************************************
         */

        /**
         * Constants used as categories.
         */
        public static CATEGORIES: any = {
            ACCESS_NAME: 'accessName',
            LANGUAGE_STATUS: 'languageStatus',
            ROLE_NAME: 'roleName',
            TRANSLATION_STATUS: 'translationStatus'
        }
    }

    /**
     * Don't forget that some methods such as exists() are written in the Model class and available for all Models.
     * The following methods belong ONLY to the mongoose model instance, not to the Model class itself!
     *
     *************************************************************************************************
     ******************************** Extended Model methods *****************************************
     *************************************************************************************************
     */
    CategoryModel.model.getCategories = (category: any = false) => {
        if(category && CategoryModel.CATEGORIES[category]){
            return CategoryModel.CATEGORIES[category];
        }else{
            return CategoryModel.CATEGORIES;
        }
    };

    /**
     *************************************************************************************************
     *************************** Methods to use only locally (private) *******************************
     *************************************************************************************************
     */
}