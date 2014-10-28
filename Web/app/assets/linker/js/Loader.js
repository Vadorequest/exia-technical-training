/**
 * Main loader for redondant stuff to load.
 *
 * @example To export specific classes to a sub-loader:
 Loader._exports([
 {
     o: _specificClass.SpecificClass,
         n: 'ClassX'
 }
 ]);
 */
(function () {
    Loader = this;

    /**
     * Export the commun stuff to all pages.
     * @param _lang                     Class that manage languages and translations.
     * @param _messageLang              Class that manage a message that can be translated.
     * @param _message                  Class used everywhere to create a preformated message for communicate.
     * @param _validatorMessage         Class that manage validation message from the validator server side.
     * @param _format                   Class that format responses.
     * @param _Dao                      Data Access Object used to link the client side with the DB schemas. Used by the validation.
     * @param _validatorExtended        Validator custom that extends https://github.com/chriso/validator.js
     * @param _appValidator             Application validator, that uses the _validatorExtended internally and the validator shared across our applications.
     * @param _view                     View helper.
     */
    Loader.export = function (_lang, _messageLang, _message, _validatorMessage, _format, _Dao, _validatorExtended, _appValidator, _view) {
        consoleDev('All libraries loaded. Running initialization process...', 'debug');

        // Generate shortcuts for client side source code.
        Loader._exports([
            {
                o: _lang.Lang,
                n: 'Lang'
            },
            {
                o: _messageLang.MessageLang,
                n: 'MessageLang'
            },
            {
                o: _message.Message,
                n: 'Message'
            },
            {
                o: _validatorMessage.ValidatorMessage,
                n: 'ValidatorMessage'
            },
            {
                o: _format.Format,
                n: 'Format'
            },
            {
                o: _validatorExtended,
                n: 'validator'// validator used by our Validator/__validator internally.
            },
            {
                o: _appValidator.TranslateValidator,
                n: 'Validator'// Class to use specific to our app.
            },
            {
                o: _view.View,
                n: 'View'// Class to use specific to our app.
            }
        ]);

        // Compatibility mode globals client/server. (Because some functions will call the server side globals, referenced by __something)
        Loader._exports([
            {
                o: _lang.Lang,
                n: '__lang'
            },
            {
                o: _messageLang.MessageLang,
                n: '__messageLang'
            },
            {
                o: _message.Message,
                n: '__message'
            },
            {
                o: _validatorMessage.ValidatorMessage,
                n: '__validatorMessage'
            },
            {
                o: _format.Format,
                n: '__format'
            },
            {
                o: _Dao.DaoPublic,
                n: '__Dao'// Name exception. (Uppercase)
            },
            {
                o: _appValidator.TranslateValidator,
                n: '__validator'// Validator to use in the application.
            },
            {
                o: _view.View,
                n: '__view'// Validator to use in the application.
            }
        ]);

        // Pre-initialization done.
        consoleDev('Pre-Initialization done with success.', 'debug');
    };

    /**
     * Export an array of object to made them public on the browser.
     * @param   objects - Array of objects. Class of function basically.
     * @private
     */
    Loader._exports = function (objects){
        for(var i in objects){
            Loader._export(objects[i].o, objects[i].n);
        }
    };

    /**
     *Export an object to the browser to make it public.
     * @param o     Object to export.
     * @param name  Customise the name. Optional.
     * @private
     */
    Loader._export = function (o, name){
        if(!name){
            name = o.name;
        }
        window[name] = o;
    };


    return Loader;
})();
