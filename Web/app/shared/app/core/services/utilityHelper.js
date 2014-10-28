/**
 * utilityHelper
 *
 * @module      :: utilityHelper
 * @description :: Contains utility helpers.
 */
module.exports = {
    /**
     * Returns the value of the variable if defined, return the default values if not defined.
     *
     * @param _var      Variable.
     * @param _default  Default value. [false]
     * @return {*}
     */
    defined: function(_var, _default) {
        if(!_default){
            _default = false;
        }
        return typeof value === "undefined" ? _default : _var;
    },

    /**
     *  Returns true if the variable is defined.
     *
     * @param _var      Variable.
     * @return {boolean}
     */
    isDefined: function(_var){
        return typeof value !== "undefined";
    },

    isFalsy: function(_var){
        return
            typeof _var === 'undefined' ||
            isNan(_var) ||
            _var === 0 ||
            _var === '' ||
            _var === null ||
            _var === false
    }
};