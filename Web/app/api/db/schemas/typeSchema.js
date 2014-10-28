/**
 * Schema used to create a category.
 * A category is copied into each type.
 * @see http://mongoosejs.com/docs/2.7.x/docs/schematypes.html
 */
var typeSchema = {
    /**
     * Code that references a sentence object. Used to translate the name into different languages.
     */
    code: {
        type: String,
        match: /^[a-zA-Z0-9]+$/,
        trim: true,
        required: true,
        notEmpty: true,
        unique: true
    },

    /**
     * Name, in English, used by the application itself to reference a category.
     * Is unique for the same category.
     */
    name: {
        type: String,
        match: /^[a-zA-Z]+$/,
        trim: true,
        required: true,
        notEmpty: true,
        check: {
            minLength: 2
        }
    },

    /**
     * Category that contains the type.
     */
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        index: true
    },

    /**
     * Category name, shortcut.
     * Used to avoid to have to always retrieve the category when run query with simple filter by category.
     */
    categoryName: {
        type: String,
        match: /^[a-zA-Z]+$/,
        trim: true,
        required: true,
        notEmpty: true,
        check: {
            minLength: 2
        },
        index: true
    }

};

/**
 * Export.
 */
module.exports = typeSchema;