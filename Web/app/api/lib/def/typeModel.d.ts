///<reference path='./defLoader.d.ts'/>

declare module Models {
    export class TypeModel extends Models.Model {
        public code: string;
        public name: string;
        public category: any;
        public categoryName: string;

        public static CATEGORIES: any;
    }
}