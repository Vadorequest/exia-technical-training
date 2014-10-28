/**
 * applicationHelper
 *
 * @module      :: applicationHelper
 * @description :: Contains logic that is specific to this application.
 */
var applicationHelper = {

    /**
     * Contains the most recent code used, as Hexadecimal string.
     */
    _mostRecentCode: '0',

    /**
     * Read a bunch of tables in the DB and get the most recent code used by the application and store them into the memory.
     */
    retrieveMostRecentCode: function(){
        // Read all tables and extract latest row for each.
        _.each(__config.db.collectionsContainingCodeColumn, function(collectionName){
            var Collection = __Dao.getModel(collectionName);

            // If the collection is defined.
            if(Collection){
                Collection.findOne({}, {}, { sort: { 'createdAt' : -1 } }, function(err, doc){
                    if(err){
                        Collection.errorHandler(err, traceback(), function(err){
                            // Fatal error. Display the message.
                            throw err.getMessage();
                        });
                    }else{
                        // If at least one document exist in this collection.
                        if(doc){
                            // If the current code is higher than the code stored then update it. Do not use getMostRecentCode() here to avoid infinite loop.
                            if(parseInt(doc.code, 16) > parseInt(applicationHelper._mostRecentCode, 16)){
                                applicationHelper.updateMostRecentCode(doc.code);
                            }
                        }
                    }
                });
            }
        });
    },

    /**
     * Get the most recent code, read the memory if stored in memory, if not then refresh the memory.
     */
    getMostRecentCode: function(){
        // If the value exist in memory then retrieve it.
        if(applicationHelper._mostRecentCode !== 0){
            return applicationHelper._mostRecentCode;
        }else{
            // Otherwise get the value from the DB.
            return applicationHelper.retrieveMostRecentCode();
        }
    },

    /**
     * Increment the code stored in the memory and returns it.
     */
    incrementCode: function(){
        // Increment the code: Parse it in int following hexadecimal notation, then increment and then convert it in hexadecimal as string.
        var codeIncremented = (parseInt(applicationHelper.getMostRecentCode(), 16) + 1).toString(16);

        // Refresh value in memory
        applicationHelper.updateMostRecentCode(codeIncremented);

        return applicationHelper.getMostRecentCode();
    },

    /**
     * Update the value of the most recent code used.
     */
    updateMostRecentCode: function(code){
        applicationHelper._mostRecentCode = code;
    }
};

module.exports = applicationHelper;