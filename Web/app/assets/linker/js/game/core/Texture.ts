///<reference path='./../defLoader.d.ts' />

module Game.Core {
    export interface ITextureSettings {
        NAME : string;
        IMG : string;
        WIDTH : number;
        HEIGHT : number;
        SPEED : number;
    }

    export class Texture extends PIXI.Texture {

    }
}