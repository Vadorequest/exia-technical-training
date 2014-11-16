///<reference path='./../defLoader.d.ts' />

/**
 * Je ne suis pas sur de m'en servir, en attente de réponse sur SO.
 */
module Game.Core {
    export interface IObject {}

    export interface IManagedObject extends IObject{
        getKeyInManager(key: string): string;
        setKeyInManager(key: string): IObject;
    }
}

/*
 export class DisplayObject extends PIXI.DisplayObject {
 private _keyInManager: string;

 public getKeyInManager(key: string): string{
 return this._keyInManager;
 }

 public setKeyInManager(key: string): DisplayObject{
 this._keyInManager = key;
 return this;
 }
 }
 */