///<reference path='./../defLoader.d.ts' />
var Game;
(function (Game) {
    var Managers;
    (function (Managers) {
        /**
         * Provide a set of common methods that can be overridden by any child.
         */
        var Manager = (function () {
            function Manager() {
            }
            /**
             * Return an element indexed by its name.
             *
             * @param name
             * @returns {*}
             */
            Manager.prototype.get = function (name) {
                return typeof this._elements[name] !== void 0 ? this._elements[name] : null;
            };
            /**
             * Add an element, indexed by its name.
             *
             * @param name
             * @param element
             * @returns {Game.Managers.Manager}
             */
            Manager.prototype.add = function (name, element) {
                // If the element doesn't already have a name then add one.
                if (typeof element.__name !== void 0) {
                    element.__name = name;
                }
                // Add the element to the array of managed objects.
                this._elements[name] = element;
                return this;
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