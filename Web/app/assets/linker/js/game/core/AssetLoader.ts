///<reference path='./../defLoader.d.ts' />

module Game.Core {
    export class AssetLoader extends PIXI.AssetLoader{

        /**
         * Load assets and execute the onComplete callback once it's loaded.
         *
         * @param assets
         * @param onComplete
         * @returns {Game.Core.AssetLoader}
         */
        public static loadAssets(assets: string[], onComplete: ()=> any): AssetLoader{
            var loader = new AssetLoader(assets);
            loader.onComplete = onComplete;
            loader.load();

            return loader;
        }
    }
}