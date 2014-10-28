/**
 * HomeController
 *
 * @module		:: Controller
 * @description	:: Home page.
 */
var controller = require('./Home').Controllers.Home;

/**
 * Bind public controller methods.
 */
module.exports = controller.exports();