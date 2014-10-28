///<reference path='./defLoader.d.ts'/>

declare module Models {
    export interface IModel extends CoreModels.IModel {}

    export class Model extends CoreModels.Model {}

    export class MongoError extends CoreModels.MongoError {}
}