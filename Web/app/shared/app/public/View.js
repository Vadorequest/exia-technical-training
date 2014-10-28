///<reference path='./../lib/def/defLoader.d.ts'/>
define(["require", "exports"], function(require, exports) {
    var View = (function () {
        function View() {
        }
        /**
        * Load a template located in the assets folder.
        * Based on Sails client side templates.
        *
        * @param template  Name or path of the template.
        * @param data      Data to bind to the template.
        * @return {html}
        */
        View.template = function (template, data) {
            // JST is only available client side.
            return JST['assets/linker/templates/' + template + '.ejs'](data);
        };

        /**
        * Generate a content based on a template content.
        * Usually used when generating content from a template "on the fly", that is not stored in a file but contained in a string.
        *
        * @param template  Content of the template. ('<b><%= title %></b>')
        * @param data      Data to bind to the template.
        * @param options   Options specific to Lodash to change the way the template will be rendered.
        * @return {any}
        *
        * @see http://lodash.com/docs#template
        */
        View.subTemplate = function (template, data, options) {
            return _.template(template, data, options);
        };

        /**
        * Return true if the current controller/action match the expected controller/action.
        *
        * @param controller - Controller to match.
        * @param action - Controller action to match.
        * @param currentController - Current controller.
        * @param currentAction - Current controller action.
        *
        * @example From a view: (controller and action are provided in the view by default)
        *  __view.isActivePage('home', 'index', controller, action);
        *
        * @return {boolean}
        */
        View.isActivePage = function (controller, action, currentController, currentAction) {
            return (controller === currentController && action === currentAction);
        };

        /**
        * Return active if the current controller/action match the expected controller/action.
        * Possible to override what to return if active/inactive.
        *
        * @param controller - Controller to match.
        * @param action - Controller action to match.
        * @param currentController - Current controller.
        * @param currentAction - Current controller action.
        * @param active - String to return if active. ['active']
        * @param inactive - String to return if inactive. ['']
        * @return {string}
        */
        View.activePage = function (controller, action, currentController, currentAction, active, inactive) {
            if (typeof active === "undefined") { active = 'active'; }
            if (typeof inactive === "undefined") { inactive = ''; }
            return View.isActivePage(controller, action, currentController, currentAction) ? active : inactive;
        };

        /**
        * Return active if the current controller match the expected controller.
        * Possible to override what to return if active/inactive.
        *
        * @param controller - Controller to match.
        * @param currentController - Current controller.
        * @param active - String to return if active. ['active']
        * @param inactive - String to return if inactive. ['']
        * @return {string}
        */
        View.activeController = function (controller, currentController, active, inactive) {
            if (typeof active === "undefined") { active = 'active'; }
            if (typeof inactive === "undefined") { inactive = ''; }
            return View.isActivePage(controller, null, currentController, null) ? active : inactive;
        };

        /**
        * Return active if the current controller belongs to the expected controller namespace.
        * Possible to override what to return if active/inactive.
        *
        * @param ns - Controller namespace to match.
        * @param currentController - Current controller. Will contain the namespace and the controller, separated by a dash.
        * @param active - String to return if active. ['active']
        * @param inactive - String to return if inactive. ['']
        * @return {string}
        */
        View.activeControllerNs = function (ns, currentController, active, inactive) {
            if (typeof active === "undefined") { active = 'active'; }
            if (typeof inactive === "undefined") { inactive = ''; }
            return currentController.split('/')[0] === ns ? active : inactive;
        };
        return View;
    })();
    exports.View = View;
});
//# sourceMappingURL=View.js.map
