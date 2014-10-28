/**
 * stringHelper
 *
 * @module		:: stringHelper
 * @description	:: Contains helper about string.
 */
module.exports = {

    /**
     * Replaces the first letter of a word with a lowercase letter
     *
     * @param {String} str                          The string who must be updated
     * @example                                     "Call me god" => "call me god"
     *
     * @return {String}                             Get the str updated
     */
    lcFirst : function(str) {
        return str.charAt(0).toLowerCase() + str.slice(1);
    },

    /**
     * Replace multiple space by one
     *
     * @param {String} str                          The string who must be updated
     * @example                                     "      call   me god   " => " call me god "
     *
     * @return {String}                             Get the str updated
     */
    removeDoubleSpace : function(str) {
        return str.replace(/ {2,}/g, ' ');
    },

    /**
     * Replace space by an other character
     *
     * @param {String} str                          The string who must be replaced
     * @param {String} byThis                       Space was replace bu this chara
     * @example                                     "      call   me god   " => "_____call___me_god___"
     *
     * @return {String}                             Get the str replaced
     */
    replaceSpace : function(str, byThis) {
        return str.replace(/ {1,}/g, byThis);
    },

    /**
     * Replace string/letter by an other thing
     *
     * @param {String} str                          The string who must be replaced
     * @param {String} strThis                      The letter/string who must be replaced
     * @param {String} byThis                       The new letter/string used
     *
     * @return {String}                             Get the str replaced
     *
     * @example                                     "My green house got green grass" => "My red house got red grass"
     */
    replaceThisByThis : function(str, strThis, byThis) {
        return str.replace(strThis, byThis, "gi");
    },

    /**
     * Remove space before and after String
     *
     * @param {String} str                         The string who must be trimmed
     * @return {String}                            Get the str trimmed
     *
     * @example                                    "      call   me god   " => "call   me god"
     */
    trim : function(str) {
        return str.replace(/^\s+|\s+$/g, '');
    },

    /**
     * Replaces the first letter of a word with a capital letter
     *
     * @param {String} str                          The string who must be updated
     * @return {String}                             Get the str updated
     *
     * @example                                     "call me god" => "Call me god"
     */
    ucFirst : function(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    },

    /**
     * Replaces the first letter in a String by a capital letter
     *
     * @param {String} str                          The string who must be updated
     * @return {String}                             Get the str updated
     *
     * @example                                     "call me god" => "Call Me God"
     */
    ucWords : function (str) {
        return (str.toLowerCase() + '').replace(/^([a-z])|\s+([a-z])/g, function($1) {
            return $1.toUpperCase();
        });
    }
};