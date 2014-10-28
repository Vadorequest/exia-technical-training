/**
 * That's a sample lib to execute some operation on var
 * @author Dhumez Sebastien
 */

module.exports = {

    /**
     * Search if a string or other is contained by str
     * @param str           The string must be searched
     * @param table         The string/array who must be used to search in str
     */
    contains : function(str, table) {

        // Getting result
        var result = false,
            strTable = table;

        // Check if table is an array (or just a letter/String)
        if (Object.prototype.toString.call(strTable) != '[object Array]') {
            strTable = [table];
        }

        // Read all table and search if table container is used in str
        for (var i = 0; i < strTable.length; i++) {
            if (str.indexOf(strTable[i]) != -1) {
                result = true;
                break;
            }
        }

        // Get back result
        return result;
    },

    /**
     * Sample trim function
     * @param str           The string must be trim
     * @example             "      call   me god   " => "call   me god"
     */
    trim : function(str) {
        return str.replace(/^\s+|\s+$/g, '');
    },

    /**
     * Replace space by an other character
     * @param str           The string must be trim
     * @param byThis        Space was replace bu this chara
     * @example             "      call   me god   " => "_____call___me_god___"
     */
    replaceSpace : function(str, byThis) {
        return str.replace(/ {1,}/g, byThis);
    },

    /**
     * Replace string/letter by an other thing
     * @param str           The string must be trim
     * @param strthis       The letter/string who must be replaced
     * @param byThis        The new letter/string used
     * @example             "My green house got green grass" => "My red house got red grass"
     */
    replaceThisByThis : function(str, strThis, byThis) {
        return str.replace(strThis, byThis, "gi");
    },

    /**
     * Replace multiple space by one
     * @param str           The string must be trim
     * @example             "      call   me god   " => " call me god "
     * TODO Dubble? Seriously? Double! Or Multiple!
     */
    removeDubbleSpace : function(str) {
        return str.replace(/ {2,}/g, ' ');
    }

    // TODO Add ucfirst()

};