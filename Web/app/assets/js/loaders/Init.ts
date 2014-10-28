///<reference path="./../lib/def/defLoader.d.ts" />

/**
 * Super init, inherited by all other init classes.
 */
export class Init{
    private _config: any;

    /**
     * Run the base level initialization.
     *
     * @param config            Config object.
     * @param languages         All languages and config. Doesn't contains the texts, only config.
     * @param defaultLanguage   The entire default language.
     */
    constructor(config: any, languages: any, defaultLanguage: any){
        this._init(config, languages, defaultLanguage);
    }

    /**
     * Base level initialization.
     *
     * @param config            Config object.
     * @param languages         All languages and config. Doesn't contains the texts, only config.
     * @param defaultLanguage   The entire default language.
     * @private
     */
    private _init(config: any, languages: any, defaultLanguage: any){
        consoleDev('Basic initialization starting...', 'debug');
        this._config = config;

        // Init the global Dao by binding the public schemas.
        this._initDao();

        // Init the global Lang, by binding the required languages.
        this._initLanguage(languages, defaultLanguage);

        consoleDev('Basic initialization done with success.', 'debug');
    }

    /**
     * Language initialization. Must be initialized in first to have error message available.
     *
     * @param languages         All languages and config. Doesn't contains the texts, only config.
     * @param defaultLanguage   The entire default language.
     * @private
     */
    private _initLanguage(languages: any, defaultLanguage: any){
        consoleDev('Language initialization starting...', 'debug');
        // Create the singleton instance for the client.
        window['lang'] = new __lang(this._config, languages, defaultLanguage, __message);
        consoleDev('Language initialization done with success!', 'debug');
    }

    /**
     * Initialize the global DAO by binding into its cache the public schemas.
     * @private
     */
    private _initDao(){
        consoleDev('Dao initialization starting...', 'debug');
        if(typeof this._config._schemas !== 'undefined' && typeof __Dao !== 'undefined'){
            for(var name in this._config._schemas){
                __Dao.addSchemaInCache(name, this._config._schemas[name]);
            }
            consoleDev('Dao initialization done with success!', 'debug');
        }else{
            consoleDev('Unable to initialize the global Dao!', 'error');
            consoleDev('Schemas:', 'debug');
            consoleDev(this._config._schemas, 'debug');
            consoleDev('Dao:', 'debug');
            consoleDev(__Dao, 'debug');
        }
    }
}