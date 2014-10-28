declare class Lang{
    addLanguage(lang: String, language: any): any;
    get(id: string, args?: any, lang?: string): string;
    getLang();
    getLangs();
    getForeignLang();
    getLanguages();
    static waitForInstance(callback);
    static waitForInstanceSynch();
}