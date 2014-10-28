# Core
**This directory must use CommonJs typescript compilation**

It contains the files shared in the core of the game server (`/app`), it's equivalent to the `/api` directory in sails.js.

- **controllers**: Shared controllers. Contains the CoreController that is the parent of all controllers for all applications.
- **lib**: Shared libraries. These libraries are shared across applications because we need to use the same everywhere.
- **models**: Shared models. Contains the CoreModel that is the parent of all models for all applications.
- **services**: AKA helpers, these files are used in all applications too. There contains functions about a specific area.

## Do not forget to:
**Add the file name in the `_serverConfig.json` file to allow child application to download it by default.**

## Inheritance
The core is likely shared not only with both `web-server` and `game-server` but also with all external applications.
But do this require some finesse.

Because all application may need to overload/override the Core files, we need to allow such thing.
To do so, we use an intermediate file that belongs to the application itself. The process is the same for all Core files.

### Services
Services are basically helpers, they are automatically loaded by the sails framework. *(api/services)*
They usually don't need to be overridden, but we still `require` them from the external applications, we write them in javascript, not with TS.

**api/services/configHelper.js**

`module.exports = require('./../../shared/app/core/services/configHelper');`

To ensure that the services will be automatically loaded by sails, we require the Core service, if any override is necessary, it's not difficult to do it.
(Import, store in variable, add/override functions and export)

### Libraries
All library file names must start by `Core`, the same for the class name. They are all written in TypeScript.

To override a lib, we need to extend it, to do so we first need to import it.

`import cache = require('./../../shared/app/core/lib/CoreCache');`

And then extend it.

`export class Cache extends cache.CoreCache`

Now, we have a `Cache` class that extends the `CoreCache` and we can override it as we want in our application.
This is really useful, especially when we want to improve a Core file, you can work on the application, disable the auto caching and then modify the source code.
You won't need to do it in the Game application, you can do it from any other application.

And, of course, the most important part is that you can customize the class for the application itself.

### Controller and Model
The Controller and Model act exactly like the libraries. It actually makes me thing that I should put them both inside the lib folder.


## Models and Typescript
The models are quite complicated to fully understand, because everything with TS is complicated and because I wanted to keep the things as simple as possible to use, the logic behind is actually complicated!

First of all, an instance of CoreModels.Model **is NOT** a **mongoose.Model** instance, that's completely different!
`CoreModels.Model` is actually a *kind of* model container. It does contain an instance of **mongoose.Model**, but inside itself: `CoreModels.Model.model`. This is a real mongoose.Model instance.

The thing is, we use the Dao class *to load* all our models and get a real mongoose.Model instance by calling: `var User = __Dao.getModel('user');`.
Then you can use the model normally and create documents by `var user = new User();`, even create a non-empty document by passing an object: `var user: any = new User({pseudo: 'Ayolan');`.
Once your document is filled, you can just save it! `user.save(callback)`, nothing different from the mongoose way.

As you see, the *use* is **simple**. What's behind is way more tricky.

If you want to get auto-completion and debug, you can instanciate your document as the following: `var user: Models.UserModel = new User({pseudo: 'Ayolan');`.

**WTF? But that's not a mongoose.Model instance! That's the container of the instance**

You're completely right. But as I said, I wanted to keep things **simple** *to use*.
Of course a `User` instance should be an instance of `Models.UserModel`, the problem with TS is that we can't really **type** a class module (I'm not talking about an instance).
I can't type `var User = __Dao.getModel('user');`, except with `any` *(and I should by the way!)* because it's not an *instance* of anything, that's a class that can be instanciated, but not an instance.

**So, how does that works?** That's just a trick with TS actually. Because it cannot find out what is an instance and what's a container I just mixed both inside the `shared/app/lib/CoreModel.d.ts` file.
So, in the TypeScript code, the `CoreModel.ts` file acts as a container, but the TS definition acts as both the container **and** a `mongoose.Model` instance.

Hard to understand, but easy to use, everything is transparent, it gets messy when you try to understand how it works behind, but... *TypeScript is a mess!*
