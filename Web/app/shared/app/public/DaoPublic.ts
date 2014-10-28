///<reference path='./../lib/def/defLoader.d.ts'/>

/**
 * Used to access database public schemas.
 * Doesn't have any access to the database.
 * Used by the client only.
 * Acts as a Singleton object.
 *
 * @example
 *          console.log(__Dao.getSchema('User'));
 *
 *          var minLength = __Dao.getSchema('user').login.minLength;
 */
export class DaoPublic {

    /**
     * False:   Messages are not displayed in the server console.
     * True:    Messages are displayed in the server console.
     */
    private static DEBUG: boolean = false;
    private static DEBUG_TAG: string = '--DaoPublic DEBUG--';

    /**
     * Contains a cache of all schemas previously required to avoid I/O operation.
     */
    private static _cacheSchemas: any = [];

    /**
     * Return the schema of the schema.
     *
     * @param schemaName     Targeted schema.
     * @param extension     Extension of file to load. [_defaultExtensionSchemaFile]
     * @returns {*}
     */
    public static getSchema(schemaName: string): any{
        schemaName = DaoPublic._cleanSchemaName(schemaName);

        return DaoPublic._isSchemaInCache(schemaName) ? DaoPublic._getSchemaFromCache(schemaName) : false;
    }

    /**
     * Add a model in the cache, referenced by its name.
     *
     * @param schemaName     Name of the Model.
     * @param Model         Model itself, containing sub Model and Schema and more.
     * @private
     */
    public static addSchemaInCache(schemaName: string, Model: any): void{
        DaoPublic._log('New schema cached:' + schemaName);
        DaoPublic._cacheSchemas[schemaName] = Model;
    }

    /**
     * Clean the schema name before use it.
     *
     * @param schemaName     Schema to load.
     * @returns {string}
     * @private
     */
    private static _cleanSchemaName(schemaName: string): string{
        if(!schemaName.length){
            throw 'Unable to load a schema without its name!';
        }
        // Upper case first character.
        return schemaName.charAt(0).toLowerCase() + schemaName.slice(1);
    }

    /**
     * Check if the targeted model exists in the cache.
     *
     * @param schemaName     Name of the model to check.
     * @returns {boolean}
     * @private
     */
    private static _isSchemaInCache(schemaName: string): boolean{
        DaoPublic._log('Check if schema ' + schemaName + ' is cached: ' + (DaoPublic._cacheSchemas && DaoPublic._cacheSchemas[schemaName] ? true: false));
        return (DaoPublic._cacheSchemas && DaoPublic._cacheSchemas[schemaName]);
    }

    /**
     * Returns the model from the cache.
     *
     * @param schemaName     Name of the model to retrieve.
     * @returns {boolean}
     * @private
     */
    private static _getSchemaFromCache(schemaName: string): any{
        DaoPublic._log('Get schema ' + schemaName + ' from cache.');
        return DaoPublic._cacheSchemas[schemaName];
    }

    /**
     * Log message in the server console but only if DEBUG is enabled.
     *
     * @param message   Message to log.
     * @private
     */
    private static _log(message: any): void{
        if(DaoPublic.DEBUG){
            console.log(DaoPublic.DEBUG_TAG + ' ' + message + '\n');
        }
    }
}