/**
 * dbHelper
 *
 * @module		:: dbHelper
 * @description	:: Contains helper about database.
 */

module.exports = {

    /**
     * Merge attributes between an instance of a database model and an object of values. Useful before update a model or create one with dynamic fields.
     * @param       model {Object} Instance of a Database Model.
     * @param       data {Object} New data to use for update the model.
     * @param       removeFields {Array} Array of string which are the key to delete before try to add. Useful for be sure to don't update some fields if they are not set. (Like password, because it will be hashed again)
     * @returns     {Object} Returns the model with fields updated.
     */
    merge: function(model, data, removeFields){
        removeFields = removeFields ? removeFields : false;

        // If we have fields to remove.
        if(removeFields && _.isArray(removeFields)){
            // Clean the object.
            for (var field in model){
                if(_.contains(removeFields, field)){
                    delete model[field];
                }
            }
        }

        // Update values.
        for (var field in data){
            model[field] = data[field];
        }

        return model;
    }
};