///<reference path='./../defLoader.d.ts' />

module Game.Managers {

    /**
     * Interface for all managers to make sure they provide some common methods.
     */
    export interface IManager {
        get(key: string): any;
        add(key: string, element: any): Manager;
        destroy(): Manager;
    }

    /**
     * Provide a set of common methods that can be overridden by any child.
     */
    export class Manager{
        /**
         * Elements that are managed by the manager.
         */
        private _elements: PIXI.DisplayObject[];

        /**
         * Return an element indexed by its name.
         *
         * @param name
         * @returns {*}
         */
        public get(name: string): any{
            return typeof this._elements[name] !== void 0 ? this._elements[name] : null;
        }

        /**
         * Add an element, indexed by its name.
         *
         * @param name
         * @param element
         * @returns {Game.Managers.Manager}
         */
        public add(name: string, element): Manager{
            // If the element doesn't already have a name then add one.
            if(typeof element.__name !== void 0){
                element.__name = name;
            }

            // Add the element to the array of managed objects.
            this._elements[name] = element;

            return this;
        }

        /**
         * Destroy all registered elements the hard way.
         */
        public destroy(){
            this._elements = [];

            return this;
        }
    }
}