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
var CoreDao = (function () {
    function CoreDao() {
    }
    /**
     * Return the model.
     *
     * @param modelName     Targeted model.
     * @param extension     Extension of file to load. [_defaultExtensionModelFile]
     * @returns {*}
     */
    CoreDao.getModel = function (modelName, extension) {
        if (extension === void 0) { extension = CoreDao._defaultExtensionModelFile; }
        modelName = CoreDao._cleanModelName(modelName);
        var model = CoreDao._isModelInCache(modelName) ? CoreDao._getModelFromCache(modelName) : CoreDao._getModelIfExists(modelName, extension);
        if (model) {
            return model.model;
        }
        else {
            return false;
        }
    };
    /**
     * Return the schema of the model.
     *
     * @param modelName     Targeted model.
     * @param extension     Extension of file to load. [_defaultExtensionModelFile]
     * @returns {*}
     */
    CoreDao.getSchema = function (modelName, extension) {
        if (extension === void 0) { extension = CoreDao._defaultExtensionModelFile; }
        modelName = CoreDao._cleanModelName(modelName);
        var model = CoreDao._isModelInCache(modelName) ? CoreDao._getModelFromCache(modelName) : CoreDao._getModelIfExists(modelName, extension);
        if (model) {
            return model.schema;
        }
        else {
            return false;
        }
    };
    /**
     * Set the model directory.
     *
     * @param modelDirectory
     */
    CoreDao.setModelDirectory = function (modelDirectory) {
        if (modelDirectory === void 0) { modelDirectory = CoreDao._modelsDirectory; }
        CoreDao._modelsDirectory = modelDirectory;
    };
    /**
     * Clean the model name before use it.
     *
     * @param modelName     Model to load.
     * @returns {string}
     * @private
     */
    CoreDao._cleanModelName = function (modelName) {
        if (!modelName.length) {
            throw 'Unable to load a model without its name!';
        }
        // Upper case first character.
        return modelName.charAt(0).toUpperCase() + modelName.slice(1);
    };
    /**
     * Generate the model filename and return it.
     *
     * @param modelName     Model to load.
     * @param extension     Extension of the file.
     * @returns {string}
     * @private
     */
    CoreDao._getModelFilename = function (modelName, extension) {
        return modelName + CoreDao._suffixModelName + '.' + extension;
    };
    /**
     * Retrieve the full model name to use to require the model file.
     * Add the prefix.
     *
     * @param modelName     Model to load.
     * @returns {string}
     * @private
     */
    CoreDao._getModelFullName = function (modelName) {
        return modelName + CoreDao._suffixModelName;
    };
    /**
     * Get the instance of the model if exists. Else return false.
     *
     * @param modelName     Model to load.
     * @param extension     Extension of the file.
     * @returns {*}
     * @private
     */
    CoreDao._getModelIfExists = function (modelName, extension) {
        var modelFilename = CoreDao._getModelFilename(modelName, extension);
        var modelFullName = CoreDao._getModelFullName(modelName);
        CoreDao._log("Model path to load: " + CoreDao._modelsDirectory + modelFilename);
        // Check if file exists.
        if (fs.existsSync(CoreDao._modelsDirectory + modelFilename)) {
            // Check if model class exists.
            var model = require(CoreDao._modelsDirectory + modelFilename);
            CoreDao._log(model);
            if (model[CoreDao._moduleModels]) {
                CoreDao._log(model[CoreDao._moduleModels]);
                // Module exists.
                if (model[CoreDao._moduleModels][modelFullName]) {
                    var Model = model[CoreDao._moduleModels][modelFullName];
                    // Cache the Model to use it directly next times.
                    CoreDao._addModelInCache(Model.modelName, Model);
                    return Model;
                }
            }
            else {
                CoreDao._log('Unable to load the model, probably because there are errors inside!');
            }
        }
        CoreDao._log('Unable to load the Model: ' + modelFullName);
        return null;
    };
    /**
     * Check if the targeted model exists in the cache.
     *
     * @param modelName     Name of the model to check.
     * @returns {boolean}
     * @private
     */
    CoreDao._isModelInCache = function (modelName) {
        CoreDao._log('Check if model ' + modelName + ' is cached: ' + (CoreDao._cacheModels && CoreDao._cacheModels[modelName] ? true : false));
        return (CoreDao._cacheModels && CoreDao._cacheModels[modelName]);
    };
    /**
     * Returns the model from the cache.
     *
     * @param modelName     Name of the model to retrieve.
     * @returns {boolean}
     * @private
     */
    CoreDao._getModelFromCache = function (modelName) {
        CoreDao._log('Get model ' + modelName + ' from cache.');
        return CoreDao._cacheModels[modelName];
    };
    /**
     * Add a model in the cache, referenced by its name.
     *
     * @param modelName     Name of the Model.
     * @param Model         Model itself, containing sub Model and Schema and more.
     * @private
     */
    CoreDao._addModelInCache = function (modelName, Model) {
        CoreDao._log('New model cached: ' + modelName);
        CoreDao._cacheModels[modelName] = Model;
    };
    /**
     * Log message in the server console but only if DEBUG is enabled.
     *
     * @param message       Message to log.
     * @private
     */
    CoreDao._log = function (message) {
        if (CoreDao.DEBUG) {
            console.log(CoreDao.DEBUG_TAG + ' ' + (typeof message == 'string' ? message : JSON.stringify(message)) + '\n');
        }
    };
    /**
     * False:   Messages are not displayed in the server console.
     * True:    Messages are displayed in the server console.
     */
    CoreDao.DEBUG = false;
    CoreDao.DEBUG_TAG = '--CoreDao DEBUG--';
    /**
     * Suffix to add after each model name before load it.
     */
    CoreDao._suffixModelName = 'Model';
    /**
     * Extension used by default to load model file.
     */
    CoreDao._defaultExtensionModelFile = 'js';
    /**
     * Directory where are stored the models.
     */
    CoreDao._modelsDirectory = path.join(__dirname, "../models/");
    /**
     * Module name of the models. False si no one.
     */
    CoreDao._moduleModels = 'Models';
    /**
     * Contains a cache of all models previously required to avoid I/O operation.
     */
    CoreDao._cacheModels = [];
    return CoreDao;
})();
exports.CoreDao = CoreDao;
//# sourceMappingURL=CoreDao.js.map