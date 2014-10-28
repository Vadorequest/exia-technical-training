/**
 * Schema used to create a category.
 * A category is copied into each type.
 * @see http://mongoosejs.com/docs/2.7.x/docs/schematypes.html
 */
var categorySchema = {
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
     */
    name: {
        type: String,
        match: /^[a-zA-Z]+$/,
        trim: true,
        required: true,
        notEmpty: true,
        unique: true,
        check: {
            minLength: 2,
            maxLength: 100
        }
    },

    /**
     * When the element was created.
     */
    createdAt: {
        type: Date,
        required: true,
        notEmpty: true
    },

    /**
     * When the element was updated for the last time.
     */
    updatedAt: {
        type: Date,
        required: true,
        notEmpty: true
    }
};

/**
 * Export.
 */
module.exports = categorySchema;