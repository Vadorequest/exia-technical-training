///<reference path='./messageLang.d.ts'/>
///<reference path='./message.d.ts'/>

declare class ValidatorMessage extends Message implements IMessage{
    public static FIELD_NAME_TYPE_MESSAGE: string;
    public static TYPE_MESSAGE: string;

    isCustomMessage: boolean;

    public addValidationError(key: string, message: any);
}

declare class ValidatorErrorMessageLang extends MessageLang{
    public static FIELD_NAME_KEY: string;
    public static FIELD_NAME_SUB_MESSAGE: string
    public static FIELD_NAME_SUB_ARGUMENTS: string;

    private _key: string;

    constructor(message: string, args: any, key: string);

    getKey(): string;
}