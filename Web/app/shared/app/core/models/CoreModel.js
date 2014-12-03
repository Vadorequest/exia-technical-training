///<reference path='./../../lib/def/defLoader.d.ts'/>
/**
 * Package that contains all Models used to interact with the database.
 */
var CoreModels;
(function (CoreModels) {
    /**
     * Parent class for all models.
     * A model contains a mongoose schema and a mongoose model and other things.
     */
    var Model = (function () {
        /**
         * Use static values as instance values.
         */
        function Model() {
            // Use static values as instance values.
            this.suffix = Model.suffix;
        }
        /**
         * Source code executed to modify the mongoose Schema middleware.
         *
         * @see http://mongoosejs.com/docs/middleware.html
         */
        Model.applyMiddleware = function (schema) {
            return schema;
        };
        /**
         * Returns a new mongoose.Schema customized instance.
         *
         * @param ChildModel    Child model that made the call.
         * @returns {*}
         * @see http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
         */
        Model.getNewSchemaInstance = function (ChildModel) {
            // Load the schema options, but don't save any modification in case of the schema wouldn't be overloaded by some childs and the values would be shared.
            var config = JSON.parse(JSON.stringify(ChildModel.schemaOptions));
            if (!config.collection) {
                // Use model name as default.
                config.collection = _.lcFirst(ChildModel.modelName);
            }
            var schema = new mongoose.Schema(ChildModel.schema, config);
            // Generate all indexes.
            Model._generateIndexes(schema, ChildModel);
            // Overload methods.
            /*schema.methods.toObject = function(callback){
             // Ts doesn't recognize this as a model, properties aren't accessible, we need to declare it as a any type.
             var self: any = this;
             console.log(self.id)
             };*/
            // Return overloaded instance.
            return ChildModel.applyMiddleware(schema);
        };
        /**
         * Retrieves a new Model instance and overload it to add statics methods available for all Models.
         *
         * @param ChildModel
         * @returns {*}
         * @see http://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
         */
        Model.getNewModelInstance = function (ChildModel) {
            // Get the Model class.
            var Model = mongoose.model(ChildModel.modelName, ChildModel.Schema);
            /**
             **************************************************************************************************
             ************************ Extended Model static methods for all Models ****************************
             **************************************************************************************************
             */
            /**
             * Handler for all database/mongoose errors.
             * TODO Return a ValidatorMessage instead of a Message instance to allow to return several errors. Hopefully this shouldn't change the code if we use the Message.create method to auto create a Message based on his type.
             *
             * @param err           Error.
             * @param trace         Must contain an instance of traceback that contains everything useful to debug.
             * @param callback      Callback function to execute.
             */
            Model.errorHandler = function (err, trace, callback) {
                // If this array contains useful information then use it, otherwise use the other,
                // that will depend on the way the script is executed but only one of the two array is useful to debug.
                var origin = trace[1].name !== null || trace[1].method !== null ? 1 : 0;
                // Extract data from the trace.
                var __filename = trace[origin].file;
                var __path_filename = trace[origin].path;
                var __function = trace[origin].name || trace[origin].method;
                var __line = trace[origin].line;
                // Will contains the error.
                var message = null;
                // Mongo error.
                if (err && err.name && err.name == 'MongoError') {
                    var _err = MongoError.parseMongoError(err);
                    if (err.code == 11000) {
                        // Duplicate key on create.
                        message = new __message(new __messageLang('__19', { duplicateValue: _err.value, field: _err.field }));
                    }
                    else if (err.code == 11001) {
                        // Duplicate key on update.
                        message = new __message(new __messageLang('__20', { duplicateValue: _err.value, field: _err.field }));
                    }
                    else {
                        // Non-managed mongo error.
                        message = new __message(new __messageLang('__21'), dev() ? { err: _err } : {}); // Return not only the message but also some information about the error if dev mode.
                    }
                    fs.appendFile(__config.path.base + __config.mongo.error.log, new Date() + ': ' + JSON.stringify({ error: err, model: _err.model, _err: _err, filename: __filename, path_filename: __path_filename, function: __function, line: __line }) + '\n');
                }
                else if (err && err.name && err.name == 'ValidationError') {
                    // Validation error from mongoose.
                    var _err = MongoError.parseValidationError(err);
                    if (_err[0].type === 'required') {
                        // Missing required value.
                        message = new __message(new __messageLang('__33', { field: _.str.capitalize(_err[0].field), error: _err[0].type }));
                    }
                    else if (_err[0].type === 'regexp') {
                        // Wrong regex.
                        message = new __message(new __messageLang('45', { value: _err[0].value, field: _err[0].field, error: _err[0].type }));
                    }
                    else {
                        // Duplicate value.
                        message = new __message(new __messageLang('__24', { duplicateValue: _err[0].value, field: _err[0].field, error: _err[0].type }));
                    }
                    if (dev()) {
                        // Will be send as args but not displayed in the message.
                        message.addData({ err: _err });
                    }
                    fs.appendFile(__config.path.base + __config.mongo.error.log, new Date() + ': ' + JSON.stringify({ error: err, model: _err.model, _err: _err, filename: __filename, path_filename: __path_filename, function: __function, line: __line }) + '\n');
                }
                else {
                    // Another error? I don't know if that could happens, but manage it anyway.
                    message = new __message('__22', dev() ? { err: err } : {}); // Return not only the message but also some information about the error if dev mode.
                    fs.appendFile(__config.path.base + __config.mongo.error.log, new Date() + ': ' + JSON.stringify({ error: err, model: _err.model }) + '\n');
                }
                if (message) {
                    // Log errors in dev mod.
                    consoleDev('A DB error happened, consult ' + __config.mongo.error.log + ' file to get more information.');
                    consoleDev(JSON.stringify(message) + ' in the file ' + __filename + ' at the function ' + __function + ':' + __line);
                }
                callback(message);
            };
            /**
             * Check if the object exists and returns it in this case.
             *
             * @param object    Object to find.
             * @param callback  Callback to execute.
             * @return
             *          err     Error if it happens. [null]
             *          found   Found object or false.
             */
            Model.exists = function (object, callback) {
                // If object is null or false or empty or whatever, don't do the research, the result could be wrong!
                if (!object) {
                    callback(null, false);
                }
                else {
                    Model.findOne(object, function (err, found) {
                        if (err) {
                            Model.errorHandler(err, ChildModel, callback);
                        }
                        else if (found) {
                            callback(null, found);
                        }
                        else {
                            callback(null, false);
                        }
                    });
                }
            };
            // Return overloaded instance.
            return Model;
        };
        /**
         * Generate all schema indexes. Basically complex indexes such as compound indexes.
         * Simples indexes are defined inside the schema itself.
         *
         * @param schema    Mongoose Schema.
         * @param ChildModel     Model static class where find the indexes configuration to apply.
         * @private
         */
        Model._generateIndexes = function (schema, ChildModel) {
            ChildModel.indexes.forEach(function (index) {
                var fields = index[0] || {};
                var options = index[1] || {};
                schema.index(fields, options);
            });
        };
        /**
         * Suffix used to load automatically models.
         */
        Model.suffix = 'Model';
        /**
         * Name of the model.
         * MUST start by uppercase letter!
         */
        Model.modelName = '';
        /**
         * Object that contains all the indexes configuration to apply when a schema is created.
         * Each configuration is inside an array, composed in two objects.
         * The first object contains the fields.
         * The second object contains the field options.
         *
         * @see http://mongoosejs.com/docs/api.html#schema_Schema-index
         */
        Model.indexes = [];
        /**
         * Schema mongoose options.
         * /!\ Don't share this object between child, that would become a MESS /!\
         *
         * @see http://mongoosejs.com/docs/guide.html#options
         * - autoIndex
         * - capped
         * - collection
         * - id
         * - _id
         * - read
         * - safe
         * - shardKey
         * - strict
         * - toJSON http://mongoosejs.com/docs/api.html#document_Document-toObject
         * - toObject http://mongoosejs.com/docs/api.html#document_Document-toObject
         * - versionKey
         */
        Model.schemaOptions = {
            autoIndex: true,
            id: true,
            _id: true,
            strict: true
        };
        return Model;
    })();
    CoreModels.Model = Model;
    /**
     * Class that manage MongoDb errors, used statically.
     */
    var MongoError = (function () {
        function MongoError() {
        }
        /**
         * Parse a mongo error to returns data from it because Mongo returns really bad errors.
         *
         * @param err       The mongo error.
         * @returns {
         *              database,
         *              model,
         *              field,
         *              value
         *          }
         */
        MongoError.parseMongoError = function (err) {
            var _err = {};
            var _message = err.err;
            /**
             * E11000 - Duplicate key on create.
             * E11001 - Duplicate key on update.
             */
            if (err.code == 11000 || err.code == 11001) {
                var message = _message.split(':');
                // Get the database where the error was generated.
                _err.database = message[0].split('.')[0];
                // Get the model where the error was generated.
                _err.model = message[1].split('.')[1];
                // Get the field name where the error was generated.
                _err.field = message[1].split('.')[2].split(' ')[0].replace('$', '');
                _err.field = _err.field.substr(0, _err.field.lastIndexOf('_'));
                // Get the value, if exists.
                _err.value = null;
                if (message[3]) {
                    var _value = message[3].split('"');
                    if (_value[1]) {
                        _err.value = _value[1].replace('\\', '');
                    }
                    else {
                        _err.value = _value[0].split(' ')[1].trim();
                    }
                }
            }
            return _err;
        };
        /**
         * Parse a mongoose validation error, probably generated during a save/update function.
         *
         * @param err       The mongoose error.
         * @returns {*}
         */
        MongoError.parseValidationError = function (err) {
            var _errors = new Array();
            var i = 0;
            for (var error in err.errors) {
                _errors[i] = [];
                _errors[i]['field'] = err.errors[error]['path'];
                _errors[i]['value'] = err.errors[error]['value'];
                _errors[i]['type'] = err.errors[error]['type'];
                i++;
            }
            return _errors;
        };
        return MongoError;
    })();
    CoreModels.MongoError = MongoError;
})(CoreModels = exports.CoreModels || (exports.CoreModels = {}));
//# sourceMappingURL=CoreModel.js.map