///<reference path='./../../lib/def/defLoader.d.ts'/>

/**
 * Use to load all Models. Data Access Object.
 * Acts as a Singleton object.
 *
 * @author  Ambroise Dhenain
 *
 * @example
 *          var User = __Dao.getModel('User');
 *          console.log(User);
 *          console.log(__Dao.getSchema('User'));
 *
 *          var minLength = __Dao.getSchema('user').login.minLength;
 */
export class CoreDao {

    /**
     * False:   Messages are not displayed in the server console.
     * True:    Messages are displayed in the server console.
     */
    private static DEBUG: boolean = false;


    private static DEBUG_TAG: string = '--CoreDao DEBUG--';

    /**
     * Suffix to add after each model name before load it.
     */
    private static _suffixModelName: string = 'Model';

    /**
     * Extension used by default to load model file.
     */
    private static _defaultExtensionModelFile: string = 'js';

    /**
     * Directory where are stored the models.
     */
    private static _modelsDirectory: string = path.join(__dirname, "../models/");

    /**
     * Module name of the models. False si no one.
     */
    private static _moduleModels: any = 'Models';

    /**
     * Contains a cache of all models previously required to avoid I/O operation.
     */
    private static _cacheModels: any = [];

    /**
     * Return the model.
     *
     * @param modelName     Targeted model.
     * @param extension     Extension of file to load. [_defaultExtensionModelFile]
     * @returns {*}
     */
    public static getModel(modelName: string, extension: string = CoreDao._defaultExtensionModelFile): any{
        modelName = CoreDao._cleanModelName(modelName);

        var model: CoreModels.IModel = CoreDao._isModelInCache(modelName) ? CoreDao._getModelFromCache(modelName) : CoreDao._getModelIfExists(modelName, extension);

        if(model){
            return model.model;
        }else{
            return false;
        }
    }


    /**
     * Return the schema of the model.
     *
     * @param modelName     Targeted model.
     * @param extension     Extension of file to load. [_defaultExtensionModelFile]
     * @returns {*}
     */
    public static getSchema(modelName: string, extension: string = CoreDao._defaultExtensionModelFile): any{
        modelName = CoreDao._cleanModelName(modelName);

        var model: CoreModels.IModel = CoreDao._isModelInCache(modelName) ? CoreDao._getModelFromCache(modelName) : CoreDao._getModelIfExists(modelName, extension);

        if(model){
            return model.schema;
        }else{
            return false;
        }
    }

    /**
     * Set the model directory.
     *
     * @param modelDirectory
     */
    public static setModelDirectory(modelDirectory: string = CoreDao._modelsDirectory){
        CoreDao._modelsDirectory = modelDirectory;
    }

    /**
     * Clean the model name before use it.
     *
     * @param modelName     Model to load.
     * @returns {string}
     * @private
     */
    private static _cleanModelName(modelName: string): string{
        if(!modelName.length){
            throw 'Unable to load a model without its name!';
        }
        // Upper case first character.
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    }

    /**
     * Generate the model filename and return it.
     *
     * @param modelName     Model to load.
     * @param extension     Extension of the file.
     * @returns {string}
     * @private
     */
    private static _getModelFilename(modelName: string, extension: string): string{
        return modelName + CoreDao._suffixModelName + '.' + extension;
    }

    /**
     * Retrieve the full model name to use to require the model file.
     * Add the prefix.
     *
     * @param modelName     Model to load.
     * @returns {string}
     * @private
     */
    private static _getModelFullName(modelName: string): string{
        return modelName + CoreDao._suffixModelName;
    }

    /**
     * Get the instance of the model if exists. Else return false.
     *
     * @param modelName     Model to load.
     * @param extension     Extension of the file.
     * @returns {*}
     * @private
     */
    private static _getModelIfExists(modelName: string, extension: string): CoreModels.IModel{
        var modelFilename = CoreDao._getModelFilename(modelName, extension);
        var modelFullName = CoreDao._getModelFullName(modelName);

        CoreDao._log("Model path to load: "+CoreDao._modelsDirectory + modelFilename);

        // Check if file exists.
        if(fs.existsSync(CoreDao._modelsDirectory + modelFilename)){
            // Check if model class exists.
            var model = require(CoreDao._modelsDirectory + modelFilename);
            CoreDao._log(model);

            if(model[CoreDao._moduleModels]){
                CoreDao._log(model[CoreDao._moduleModels]);

                // Module exists.
                if(model[CoreDao._moduleModels][modelFullName]){
                    var Model = model[CoreDao._moduleModels][modelFullName];

                    // Cache the Model to use it directly next times.
                    CoreDao._addModelInCache(Model.modelName, Model);

                    return Model;
                }
            }else{
                CoreDao._log('Unable to load the model, probably because there are errors inside!');
            }
        }
        CoreDao._log('Unable to load the Model: ' + modelFullName);

        return null;
    }

    /**
     * Check if the targeted model exists in the cache.
     *
     * @param modelName     Name of the model to check.
     * @returns {boolean}
     * @private
     */
    private static _isModelInCache(modelName: string): boolean{
        CoreDao._log('Check if model ' + modelName + ' is cached: ' + (CoreDao._cacheModels && CoreDao._cacheModels[modelName] ? true: false));
        return (CoreDao._cacheModels && CoreDao._cacheModels[modelName]);
    }

    /**
     * Returns the model from the cache.
     *
     * @param modelName     Name of the model to retrieve.
     * @returns {boolean}
     * @private
     */
    private static _getModelFromCache(modelName: string): CoreModels.IModel{
        CoreDao._log('Get model ' + modelName + ' from cache.');
        return CoreDao._cacheModels[modelName];
    }

    /**
     * Add a model in the cache, referenced by its name.
     *
     * @param modelName     Name of the Model.
     * @param Model         Model itself, containing sub Model and Schema and more.
     * @private
     */
    private static _addModelInCache(modelName: string, Model: CoreModels.IModel): void{
        CoreDao._log('New model cached: ' + modelName);
        CoreDao._cacheModels[modelName] = Model;
    }

    /**
     * Log message in the server console but only if DEBUG is enabled.
     *
     * @param message       Message to log.
     * @private
     */
    private static _log(message: any): void{
        if(CoreDao.DEBUG){
            console.log(CoreDao.DEBUG_TAG + ' ' + (typeof message == 'string' ? message : JSON.stringify(message)) + '\n');
        }
    }
}
