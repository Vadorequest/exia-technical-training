# Loaders and dependencies

Loaders are injected from the layouts. Each loader has a very precise task. There are two kind of files contained in this folder:

- **Loaders**: The loaders load all libraries that are required in the file itself. The loader is called by the template file or a view.
    - *loader-X*: It will call the **InitX** file once he has loaded all required files using **requireJs** library.

- **Init**: Initializer files. They are called by loaders to initialize the page once the libraries have been retrieved through **requireJs**.
    - *Init*: The parent of all `InitX` files, it's **inherited** and provide high level logic used and reused between initializations.
    - *InitX*: Where X is the name of the page that it will initialize. **I.E**: `InitDefault` will be called by the `loader-default`.

The Init file will initialize the language used in the browser, as well as the DAO which is needed to perform client side validations based on public rules shared between the client and the server.

## Explanations
We use the **requireJs** library to import dependencies.

The principe is simple, in each page we have a loader, for instance, in the `/game` page, we use the `loader-game.js`.
Every loader will use `requireJs` library to require all required files, once the files are loaded it will *initialize* the page by calling an `Init*` script.
I our example, the `loader-game.js` will call the `InitGame.js`, this initializer inherits from the `Init` class.

The goal of the initializer is to initialize the languages, the global class instances and the config. Depending on the page, we can also initialize other things.

## Requirements
To correctly initialize a page, we need to provide some things:

- A config object that contains:
    - environment: The current environment, either `development` or `production`.
    - defaultLanguage: The default language to use, because we know that all translation won't be always available in the main language, we need to provide a fallback language, `en` basically.
    - languages: Contains the keys to use to build the Lang instance.
        - argsKey: Key to use to store the arguments.
        - messageKey: Key to use to store the message.
- The requireJs library needs to be loaded.
- The loader to use.

As source code, it will looks like that: (in the `web-server`, sails application works a bit different and in an easier way)

```html
    <script type="text/javascript">
        //Give the server config
        var config = <%- JSON.stringify(__config.public) %>;
    </script>

    <!-- Load main dependency library -->
    <script type="text/javascript" src="./js/lib/requirejs.min.js"></script>

    <!-- Load dependencies synchronously -->
    <script type="text/javascript" src="./js/loaders/loader-game.js?t=<%- date %>"></script>
```

## Required script - Explanations
I'll take as example the `loader-game.ts` file. You can find the requireJs documentation [here](http://requirejs.org/docs/api.html).

The var `_requireJs` is basically the config for the requireJs library. **Which must be loaded before!**

We don't use the `data-main` (in the **html** file) used by requireJs in its examples, because we cannot load the dependencies asynchronously, we need to do it sync.

Then we call requireJs to load our config, once it's done we initialize.

Some of our libraries, also used server side (Message, ...) are explicitly exported in the `window` object, because we want to use the same notation as in the server side,
we use `__*` with all our globals server side and we do the same in the client.

So, libraries such as **Message** are available through `Message` and `__message`, to keep the server compatibility.

Note that we cannot use the native `requirejs.exports` method to export these objects, since we don't export the whole module, but only a specific class. (`__message = _message.Message`)

### How shared scripts are they accessible from the browser?
If you're wondering how links like that work:

```js
    'Lang': '../shared/Lang.min',
    'MessageLang': '../shared/MessageLang.min',
    'Message': '../shared/Message.min',
    'ValidatorMessage': '../shared/ValidatorMessage.min',
    'Format': '../shared/Format.min',
```

As you can see, we use a `min` version, and we load them from a `shared` folder, but that's not the shared folder in the server side!
This shared folder is actually located in `public/js/shared`.

The scripts located inside shared are actually copied and minified (production) by grunt! That's the same for all javascript files.
Everything in the `assets` folder is also copied, merged, minified to keep sync the client side.

## Auto script reload
If you develop for the client side, think to run `grunt` that automatically trigger `grunt.watch` to keep synchronized the scripts between the `/assets` and the `/public` folders.
It will also keep sync the shared scripts!

**Grunt is automatically started by sails applications.**