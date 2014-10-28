Config
======
The config folder contains the application configuration.
What's important to know is that there are three different configurations, from different locations.
*Our system use inheritance between configuration files.*

Basically, the most two important config files are:

- **_serverConfig**: Private configuration that should **never** be accessible from the client, but only server side.
- **serverConfig**: Public configuration that is accessible from the client. *(type `config` in the browser console)*

## Shared configuration - Lowest priority
The **shared configuration** is located at */shared/config/*. It's provided by the main application: the game itself.
It provides both *serverConfig* and *_serverConfig* files.

These config files have the lowest possible priority, meaning that the configuration will only be applied if both the *app* and *local* config files don't overwrite the *shared* config.

## Application configuration - Medium priority
The **app configuration** is located at */config/app/*. It's basically the configuration to use for the application. (Here, the **Translate** application)
If te same file exists in both *shared* and *app* folders then, for each **duplicated key**, the *app* will have higher priority and will overwrite the *shared* config.

These config files are saved on Git.

Of course it's possible to create new keys on files that exist in *shared*, or to create new config files too.

## Local configuration - Highest priority
The **local configuration** is located at */config/local/*. It's a **local** config, that is applied only on the current computer.
It's not saved on git, only **local**.

It's perfect to be sure, for example, to always run in *production* mode on the real server whatever the *app* environment config is.
It's pretty useful during the development, to use custom config that won't be applied on other developer's computer.

## Example

### Shared:
**shared/config/**_serverConfig.js

```
{
    "mongo": {
        "error": {
            "log": "game-server/logs/mongo.log"
        }
    },
}
```

- If we don't have config/**app**/_serverConfig.js or config/**local**/_serverConfig.js then `__config.mongo_error.log = "game-server/logs/mongo.log"`


- If we have config/**app**/_serverConfig.js

```
{
    "mongo": {
        "error": {
            "log": "logs/mongo.log"
        }
    },
}
```

Then `__config.mongo_error.log = "logs/mongo.log"`


- If we have config/**local**/_serverConfig.js

```
{
    "mongo": {
        "error": {
            "log": "mongo.log"
        }
    },
}
```

Then `__config.mongo_error.log = "mongo.log"`, but only on this computer, for others, if they don't have a local config (and the same app config file) then the value will still be `__config.mongo_error.log = "logs/mongo.log"`.