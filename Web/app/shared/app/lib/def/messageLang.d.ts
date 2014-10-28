declare class MessageLang {
    public static FIELD_NAME_MESSAGE: string;
    public static FIELD_NAME_ARGUMENTS: string;

    private _message: any;
    private _args: any;

    constructor(message: string, args?: any);
    public getMessage(args: any, translate: boolean, language: string): string;
    public setMessage(message: string): void;
    public getArgs(): any;
    public setArgs(args: any): void;
    public isComplexMessage(): boolean;
    public toSimpleObject(): any;
    public static create(message: string, args: any): MessageLang;
}