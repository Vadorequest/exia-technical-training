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
     * I'm not sure this is useful, it would probably be better to implement the interface
     * without inheritance since there aren't any shared method here.
     */
    export class Manager{
        public get(key: string){
            return null;
        }

        public add(key: string, sprite): Manager{
            return this;
        }

        public destroy(): Manager{
            return this;
        }
    }
}