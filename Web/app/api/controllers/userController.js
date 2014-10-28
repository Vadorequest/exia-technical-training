/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for user management.
 */
var controller = require('./User').Controllers.User;

/**
 * Bind public controller methods.
 */
module.exports = controller.exports();