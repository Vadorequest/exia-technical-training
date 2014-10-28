# Shared

## Introduction
This part of the application is **shared**. But shared with what? That actually depends on the sub folders!

We basically share this folder in the following cases:

- **Game server and web server**: Because the **Game** itself is composed by these two folders, using the **pomelo.js** framework,
                                    the shared folder was initially plan to share file between these two different applications.
                                    So, both of them use the same code to initialize the global variables, load modules and so on.
                                    Also, this part of the application contains the **node modules** that are used by both applications.
                                    The goal is to avoid to use different versions of the same module in our two different applications.
                                    It's easier to understand and maintain to do it like that.
                                    The configuration is also shared between these two servers.

- **Browser**: The web server deal with the views that are used by the final user, of course some stuff needs to be available
                from the browser itself. This stuff is public and can be downloaded by the users at any time.
                These files are copied into the assets, because it's not possible for the client to see the **shared** content.

- **External applications**: We share some part of the source code with some external applications. Basically the core, helpers and classes
                                that we must use in all different applications, especially about the communication, the languages.
                                We also share the files about the configuration, they are overridden in the sub applications.


## Folders
- **config**: Contains the whole configuration. Some of them are shared.
- **lib**: Contains all shared source code. **TS files are compiled in AMD (in the root).** There are used by both browser and server, we use **requireJs** to require AMD files server side.
    - **core**: Contains the core of the application. Controller, Model, lib, helpers (services)
                **TS files are compiled in CommonJs.**
    - **globals**: Contains mostly loaders and functions that are globals, to extends the properties or add debug functions, etc.
                    **TS files are compiled in CommonJs.**
    - **private**: Contains file that are shared between the application, but only here, between the *game server* and the *web server*.
                    They cannot be shared with other applications.
                    **TS files are compiled in CommonJs.**
    - **public**: Contains files that are also shared with the browser, so used by both servers and browser.
                    **TS files are compiled in AMD.**
- **node_modules**: All node modules that are used by both game and web servers.
- **schemas**: So far I don't know why they are here, I guess that's because we use them also in the web server.


## How to share to all applications by default?
Please, be aware that if you add a new file in this folder, you must add its name in the `_serverConfig.json` file too,
to allow child application to download it too when the cache is processed.

## How to share with a specific application?
If you want to not share a script to all applications then just don't add it to the `_serverConfig.json` config file!
You'll need to extend the core/lib/CoreCache and add the file in the wanted array. (Depends on its location)