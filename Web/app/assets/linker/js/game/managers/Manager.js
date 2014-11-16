///<reference path='./../defLoader.d.ts' />
var Game;
(function (Game) {
    var Managers;
    (function (Managers) {
        /**
         * Provide a set of common methods that can be overridden by any child.
         * TODO Add a way to check that the element has the right type. An attribute that contain the name of the type to check would be enough.
         */
        var Manager = (function () {
            function Manager() {
            }
            /**
             * Return an element indexed by its name.
             * /!\ Always returns a reference of the object, not a copy. /!\
             *
             * @param name
             * @returns {*}
             */
            Manager.prototype.get = function (name) {
                return typeof this._elements[name] !== void 0 ? this._elements[name] : null;
            };
            /**
             * Add a non-existing element, indexed by its name.
             * If the name already exists, do not modify it and returns false.
             *
             * @param name
             * @param element
             * @returns {Game.Managers.Manager}
             */
            Manager.prototype.add = function (name, element) {
                // Check if the key isn't already taken before to add the element.
                if (!isSet(this._elements[name])) {
                    // Add the element to the array of managed objects.
                    this._elements[name] = element;
                    return this;
                }
                else {
                    return false;
                }
            };
            /**
             * Update an existing element, indexed by its name.
             * If the element doesn't exist, don't add it and returns false.
             *
             * @param name
             * @param element
             * @returns {Game.Managers.Manager}
             */
            Manager.prototype.update = function (name, element) {
                // Check if the element exists before to update it.
                if (isSet(this._elements[name])) {
                    // Update the element to the array of managed objects.
                    this._elements[name] = element;
                    return this;
                }
                else {
                    // If the key doesn't exist, then don't add it.
                    return false;
                }
            };
            /**
             * Destroy all registered elements the hard way.
             */
            Manager.prototype.destroy = function () {
                this._elements = [];
                return this;
            };
            return Manager;
        })();
        Managers.Manager = Manager;
    })(Managers = Game.Managers || (Game.Managers = {}));
})(Game || (Game = {}));
//# sourceMappingURL=Manager.js.map