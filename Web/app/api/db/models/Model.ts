///<reference path='./../../lib/def/defLoader.d.ts'/>

import model = require('./../../../shared/app/core/models/CoreModel');

/**
 * Package that contains all Models used to interact with the database.
 */
export module Models {

    /**
     * Our own implementation of the super model that all model inherits.
     */
    export class Model extends model.CoreModels.Model {

    }

    /**
     * Our own implementation of the MongoDb errors manager, used statically.
     */
    export class MongoError extends model.CoreModels.MongoError {

    }
    /**
     * Our own implementation of the interface.
     */
    export interface IModel extends model.CoreModels.IModel {}
}