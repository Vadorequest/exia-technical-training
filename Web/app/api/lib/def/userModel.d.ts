///<reference path='./defLoader.d.ts'/>

declare module Models {
    export class UserModel extends Models.Model {
        public login: string;
        public nickname: string;
        public email: string;
        public passwordPublic: string;
        public passwordProtected: string;
        public role: any;
        public reputation: number;
        public enabled: boolean;
        public nativeLanguage: string[];
        public usedLanguages: string;

        private static _protectedFields: string[];
        private static _passwordHashMethod: string;
        private static _passwordDigest: string;

        public static getProtectedFields(): string[];
        public static hashPassword(password: string): string;
    }
}