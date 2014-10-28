/**
 * lodashExtends
 *
 * @module		:: lodashExtends
 * @description	:: Script to extend lodash library, works only for the server side yet!
 */

// Load the Lo-Dash library.
var _ = require('lodash');

// Load the list of helper who must merged with Lo-Dash
var filesToMerge = [
    './../core/services/stringHelper'
    , './../core/services/objectHelper'
    , './../core/services/utilityHelper'
];

filesToMerge.forEach(function(helper){
    _.map(require(helper), function(method, key){
        // If the key already exists, then display a warning.
        if (_[key]) {
            console.warn('Lo-Dash Extends : A method was erased (_.'+key+') by ('+helper+'.'+key+') via lodashExtends script.');
        }

        // Add the helper method to our lodash.
        _[key] = method;
    });
});

// Add underscore string.
_.str = require('underscore.string');

// Export the new Lo-Dash library extended
module.exports = _;