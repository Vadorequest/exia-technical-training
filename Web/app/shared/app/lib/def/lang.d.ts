///<reference path='./message.d.ts'/>

declare class Lang{
    private _config: any;
    public _languages: any;
    private _appDefaultLang: string;
    private _userDefaultLang: string;
    private _messageKey: string;
    private _argsKey: string;
    private _prefixMessageCode: string;
    private _parse: boolean;

    private _FIELD_CONTENT_LANG: string;
    private _FIELD_KEY_LANG: string;
    private FIELD_NAME_MESSAGE: string;
    private FIELD_NAME_ARGS: string;
    private PATTERN_ARGS: string;

    public static FIELD_NAME_SINGLETON;

    constructor(serverConfig: any, languages: any, defaultLanguage: any, parse?: boolean);
    public addLanguage(lang: string, language: any, force?: boolean, callback?: any): any;
    public get(message: string, options?: any, variables?: any): any;
    public getAppDefaultLang(): string;
    public getUserNativeLang(_default: string): string;
    public getUserUsedLanguages(): Array<string>;
    public getLang(): string;
    public getLanguages(): any;
    public loadAllLanguages(force?: boolean, reloadLanguages?: boolean);

    private _initialize(configServerPublic: any, languagesConfigFile: any, defaultLanguageFile: any);
    private _languageIsSet(lang: string): boolean;
    private _checkMessageFormat(code: string): boolean;
    private _getSentence(id: string, options: any, args: any): Message;
    private _replaceVariablesInText(message: any, args: any, lang: string): string;
    private _replaceSubKeys(self: Lang, sentence, args, regex, array, lang): string;
    private _getUserConfig(key: string, _default?: any);
    private _transformSentence(sentence: string, options?: any, variables?: any): Message;

    static waitForInstance(callback);
    static waitForInstanceSynch();
}