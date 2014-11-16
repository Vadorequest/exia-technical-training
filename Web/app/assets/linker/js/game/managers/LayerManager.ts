///<reference path='./../defLoader.d.ts' />
///<reference path='./../core/def/defLoader.d.ts'/>

module Game.Managers {
    export class LayerManager {

        /**
         * Elements that are managed by the manager.
         * @override
         */
        protected _elements: Game.Core.Layer[] = [];

    }
}