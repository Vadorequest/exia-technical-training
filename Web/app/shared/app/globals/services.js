/**
 * Load all services.
 * Some of them are also binded into lodash, but in a matter of compatibility between the applications, we allow both.
 */
configHelper = require('./../core/services/configHelper');// Not loaded in lodash.
objectHelper = require('./../core/services/objectHelper');// Loaded in lodash too.