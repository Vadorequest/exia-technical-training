# Web application

### Technologies overview

The game part of the application has been built using the wonderful library `Pixi.js`.

I decided to use *TypeScript* to use OOP inside the game, because I don't like Javascript OOP using prototypes, which is quite specific to the JS language.
TypeScript allow to use a common OOP approach, based on *JAVA* standards. It is an open-source compiler which transform `.ts` files into `.js` files.

The game is written in the `Web/app/assets/linker/js/game` folder.

The server used to host the whole application is built using the *Node.js* MVC framework `Sails.js`.

### Sails.js

Sails.js is a great node.js framework, one of the most used worldwide. http://sailsjs.org/#/documentation

We use only a few things provided by the framework, not all of it. And I have built my own components on top of the base framework as well, which are documented -*most of the time*.
For instance, the `Web/app/shared` folder isn't provided by Sails but has been created by me and contains shared components used by both the server and the clients (browsers mostly).

#### Folder architecture

I will explain a bit what the main folders are, so you get an overview of the project, even if you would need to read more about the framework itself to understand in details how it works.

- .tmp:             Contains temporary files, this folder is the only one accessible from the client (actually, only the `.tmp/public` is), all other folders in the project **are not** accessible from the clients.
- api:              Contains most of the logic specific to this application, like controllers, libraries, policies, services. This is a big one and I advise you to read the official Sails.js documentation.
- assets:           Contains javascript, styles, images and every kind of asset used by the project. (What's relative to the game is inside the `Web/app/assets/linker/js/game/resources`). Each asset is copied by a **grunt** task when the server is starting or when it's modified.
- config:           Sails.js use *conventions over configurations* but it is still possible to configure how the application is supposed to work. This folder contains the config about many aspects of the framework, as well as language files.
- logs:             Logs, used to debug.
- node_modules:     This folder contains node.js dependencies. If this folder doesn't exist it's because you haven't run the `npm install` yet.
- shared:           Shared folder, contains specific TS files that are shared with the client and the server (Message, Lang, config...). What's really used in this project in the `CoreController`.
- tasks:            Grunt tasks to execute automatically, will copy files, merge assets and more.
- test:             Unit tests.
- views:            Views used by the application, called by the controllers, using EJS which is an open source template library, similar with PHP syntax.

#### Dependencies

All local dependencies are listed in the `Web/app/package.json`. But that's not all of them because some others are global dependencies that you'll need to install as well using command line (assuming node.js is installed in your computer, if not please go to http://nodejs.org/download/)

Please execute these command lines: *(`npm` is installed when you install node, it's the *node package manager*

- LESS compiler: `npm install less -g`
- TypeScript compiler: `npm install typescript -g`
- Sails: `npm install sails -g`
- Grunt: `npm install grunt-cli -g`
- All local dependencies (you need to run this command from the `Web/app` folder: `npm install`

*`-g` mean `global`, so that the package will be shared with all node.js projects and added to the Windows/Linux PATH automatically*


#### Run the application

Once all dependencies are installed you can run the server by running the command line `sails lift` or `node app.js`, from the `Web/app` folder.

Then, go to `http://localhost:5500/`. If you wish to change the port, you can modify the `Web/app/config/app/_serverConfig.json:5` file.


### IDE configuration

What you have done so far allow you to run the project, not to modify it, because you need to setup the environment as well, AKA IDE.
To do so, please download https://www.jetbrains.com/webstorm/ IDE (9 version is the latest, 8/7 are fine), you have a 30 days free trial.

To open the project, just File->Open it. Yeah, as simple as that. It will create a `.idea` folder, do not modify it, it contains everything about how the IDE is supposed to work for this project, configuration and so on. It will not be pushed to git due to `.gitignore` rules.

What you need to setup now are mostly the file watchers that will take care of any change in the project:

- LESS *(for .less files)*
- TypeScript *(for .ts files)*

Got to File->Settings->Tools->File Watcher and add the following file watchers:

*My Webstorm is setup to contain all projects (Android, Unreal Engine, Web an Windows Phone), if you set up only for the Web folder then your paths would be slightly different.*

#### LESS
Name: `LESS`
Program: `C:\Users\Vado\AppData\Roaming\npm\lessc.cmd` *(This is mine, but yours will be similar)*
Scope: Create a new scope called `LESS` with this pattern to avoid to compile every single less files, we don't need some of them and it would slow down the computer a **lot**: `file:Web/app//*&&!file:Web/app/assets/less//*`

#### TypeScript
Name: `TypeScript`
Program: `C:\Users\Vado\AppData\Roaming\npm\tsc.cmd` *(This is mine, but yours will be similar)*
Arguments: `--sourcemap $FileName$ -t "ES5" --module commonJs`
Scope: Create a new scope called `TypeScript` with this pattern, because we don't use the same compiler config depending on whether the files would be shared with the client or not: `file:Web/app/api//*||file:Web/app/shared/app/core//*`

#### TypeScript - AMD
Name: `TypeScript - AMD`
Program: `C:\Users\Vado\AppData\Roaming\npm\tsc.cmd` *(This is mine, but yours will be similar)*
Arguments: `--sourcemap $FileName$ -t "ES5" --module "amd"`
Scope: Create a new scope called `TypeScript - AMD` with this pattern, because we don't use the same compiler config depending on whether the files would be shared with the client or not: `((file:Web/app/assets//*||file:Web/app/shared/app/*)&&!file:Web/app/shared/app/core//*||file:Web/app/shared/app/lib/def//*||file:Web/app/shared/app/globals//*||file:Web/app/shared/app/private//*||file:Web/app/shared/app/public//*)&&!file:Web/app/assets/less//*`

Just so you know, AMD is a compliant browser compilation, that allow to use JS files inside the browser using dependencies injection in a specific order.

### Pixi.js

I've built the parallax based on the Pixi documentation at http://www.pixijs.com/resources/.

Pixi is a big library which has its own documentation.
