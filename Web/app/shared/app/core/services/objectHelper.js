/**
 * Merge all the objects. Priority for the end if same keys. Recursive.
 * Infinite parameters.
 *
 * @param [] - Infinite object parameter.
 *
 * @returns {{}}
 */
function mergePriority() {
    var destination = {},
        sources = [].slice.call( arguments, 0 );

    sources.forEach(function( source ) {
        var prop;
        for ( prop in source ) {
            if ( prop in destination && Array.isArray( destination[ prop ] ) ) {
                // Concat Arrays
                destination[ prop ] = destination[ prop ].concat( source[ prop ] );

            } else if ( prop in destination && typeof destination[ prop ] === "object" ) {
                // Merge Objects
                destination[ prop ] = mergePriority( destination[ prop ], source[ prop ] );

            } else {
                // Set new values
                destination[ prop ] = source[ prop ];
            }
        }
    });
    return destination;
}

module.exports = {
    mergePriority: mergePriority,

    /**
     * Merge attributes between an instance of a database model and an object of values. Useful before update a model or create one with dynamic fields.
     *
     * @param       model {Object} Instance of a Database Model.
     * @param       data {Object} New data to use for update the model.
     * @param       removeFields {Array} Array of string which are the key to delete before try to add. Useful to be sure to don't update some fields if they are not set. (Like password, because it will be hashed again)
     *
     * @returns     {Object} Returns the model with fields updated.
     */
    mergeAttributesToModel: function(model, data, removeFields){
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