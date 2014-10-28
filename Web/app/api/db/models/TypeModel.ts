///<reference path='./../../lib/def/defLoader.d.ts'/>

import model = require('./Model');

export module Models {
    /**
     * Model used to manage the types of the application, a type belongs to a category.
     * The model is primary static, but, to make it easy to use, some things are also stored for each instance.
     * That allows the code to use both Model or instance of Model such as:
     *      Model.schema
     *      model.Schema
     */
    export class TypeModel extends model.Models.Model implements model.Models.IModel{
        /**
         *************************************************************************************************
         ****************************** Public methods & attributes **************************************
         *************************************************************************************************
         */

        /**
         * Name of the model.
         * MUST start by uppercase letter!
         */
        public static modelName: string = 'Type';

        /**
         * Readable schema as object.
         */
        public static schema: any = require('../schemas/typeSchema.js');

        /**
         * Object that contains all the indexes configuration to apply when a schema is created.
         * The first object contains the fields.
         * The second object contains the field options.
         * @see http://mongoosejs.com/docs/api.html#schema_Schema-index
         */
        public static indexes: any = [
            [{
                'name': 1,
                'category.name': 1
            }, {
                unique: true
            }]
        ];

        /**
         * Source code executed to modify the mongoose Schema middleware.
         * @see http://mongoosejs.com/docs/middleware.html
         */
        public static applyMiddleware = function(schema: mongoose.Schema){
            // Apply the parent middleware.
            schema = model.Models.Model.applyMiddleware(schema);

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
        public static Schema: mongoose.Schema = TypeModel.getNewSchemaInstance(TypeModel);

        /**
         * The mongoose Model that uses the mongoose schema.
         */
        public static model: any = TypeModel.getNewModelInstance(TypeModel);

        /**
         * Helpers to always get the property, from instance or static.
         */
        public modelName: string = TypeModel.modelName;
        public schema: mongoose.Schema = TypeModel.schema;
        public model: mongoose.Model<any> = TypeModel.model;

        /**
         *************************************************************************************************
         ***************************** Extended methods & attributes **************************************
         *************************************************************************************************
         */

        /**
         * Constants used as types.
         * Contains only static categories, not the one who are dynamics. (I.e accessName)
         */
        public static TYPES: any = {
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

    /**
     * Returns the types.
     * Can return the types for a specific category.
     * @param category
     * @returns {*}
     */
    TypeModel.model.getTypes = (category: any = false) => {
        if(category && TypeModel.TYPES[category]){
            return TypeModel.TYPES[category];
        }else{
            return TypeModel.TYPES;
        }
    };

    /**
     *************************************************************************************************
     *************************** Methods to use only locally (private) *******************************
     *************************************************************************************************
     */

}