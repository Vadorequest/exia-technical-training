///<reference path='./../defLoader.d.ts' />

module Game.Core {
    export interface ITextureSettings {
        NAME: string;
        IMG: string;
        WIDTH: number;
        HEIGHT: number;
        SPEED: number;
        SPRITE_POSITION_X?: number;
        SPRITE_POSITION_Y?: number;
        SPRITE_TILE_POSITION_X?: number;
        SPRITE_TILE_POSITION_Y?: number;
    }

    export class Texture extends PIXI.Texture {

    }
}