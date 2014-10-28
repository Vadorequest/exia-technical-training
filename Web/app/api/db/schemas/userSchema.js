/**
 * Schema used to create a user.
 * @see http://mongoosejs.com/docs/2.7.x/docs/schematypes.html
 */
var userSchema = {
    /**
     * User Login, used as id to connect between all our platforms.
     * Is private and used only to connect. Cannot be changed.
     * TODO Don't allow to start by number/special char, must be a letter.
     */
    login: {
        type: 'string',
        match: /^[a-zA-Z0-9_-]+$/,
        trim: true,
        required: true,
        notEmpty: true,
        unique: true,
        check: {
            minLength: 3,
            maxLength: 16
        }
    },

    /**
     * Public user login, displayed in the application.
     * Can be changed by the user.
     * TODO add default function that uses the pseudo.
     */
    nickname: {
        type: 'string',
        match: /^[a-zA-Z0-9_-]+$/,
        trim: true,
        required: true,
        notEmpty: true,
        unique: true,
        check: {
            minLength: 3,
            maxLength: 16
        }
    },

    /**
     * User email.
     */
    email: {
        type: 'string',
        lowercase: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        required: true,
        notEmpty: true,
        unique: true,
        check: {
            minLength: 6,
            maxLength: 50
        }
    },

    /**
     * Password wrote by the user on the GUI, not hashed or encrypted.
     * Will be encrypted to respect the "passwordProtected" rules.
     * Not stored in the DB.
     * TODO add stronger pattern. (capital/letters/numbers/spec)
     */
    passwordPublic: {
        type: String,
        check: {
            minLength: 8,
            maxLength: 60
        }
    },

    /**
     * Password sent from user interface but hashed before be send on the network.
     * Used to basically connect an user or generate the final password.
     * Not stored in the DB.
     */
    passwordProtected: {
        type: 'string',
        check: {
            length: 64
        }
    },

    /**
     * User role.
     * TODO check names.
     * - super
     * - admin
     * - moderator
     * - tester
     * - gold
     * - player
     */
    /*role: {
        type: Schema.Types.ObjectId,
        _category: 'roleName',
        ref: 'type',
        required: true
    },*/

    /**
     * Reputation earned by the user by being active in the application.
     */
    reputation: {
        type: Number,
        required: true,
        default: 0
    },

    /**
     * The user is enabled by default but if his behaviour is bad then we can kick it from this application.
     */
    enabled: {
        type : Boolean,
        default : true,
        required: true
    },

    /**
     * Native user language.
     * Full name. (Not the shortcut)
     */
    nativeLanguage: {
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
     * Native user language.
     * Full names. (Not the shortcut)
     */
    usedLanguages: [{
        type: String,
        match: /^[a-zA-Z]+$/,
        trim: true,
        required: true,
        notEmpty: true,
        check: {
            minLength: 2
        }
    }]
};

/**
 * Export.
 */
module.exports = userSchema;