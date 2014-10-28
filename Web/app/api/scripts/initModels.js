/**
 * This script import all model. They are then automatically cached in the memory.
 * It also generates all indexes.
 */
// Get all model names.
var models = fs.readdirSync(path.join(__config.path.base + 'api/db/models/'));

// Convert into an array of strings.
models = _.map(models, function(model){
    return model.split('.')[0].replace('Model', '').toLowerCase();
}).filter(function(model){return (model.length > 0)});

// Remove doubles. (.ts, .js, .map)
models = _.uniq(models, true); // Sorted array.

// Import the model, automatically cached in memory.
_.each(models, function(model){
    __Dao.getModel(model);
    consoleDev('The model "'+model+'" is now cached.', 'verbose');
});
