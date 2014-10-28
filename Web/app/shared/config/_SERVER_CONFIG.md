Server config (private)
=======================

Here are listed the attributes available in the private config object. All these configuration can be overridden in the `local/_serverConfig.json`.

- `__config.private`: Indicates if the object is public or private. Not really used. **(Static)**
- `__config.target`: Indicates if the current target is the browser or the server. Is always `server` in the private config **(Static)**

- `__config.web`: Contains configuration of the web server.
- `__config.web.webservice`: Contains configuration of the webservice in the web application.
- `__config.web.webservice.url`: URL of the web webservice. **(Static)**
- `__config.web.webservice.port`: Port of the web webservice. **(Static)**
- `__config.web.autoStartGrunt`: Indicates if grunt should be started when the web server starts.

- `__config.game`: Contains configuration of the game application.
- `__config.game.webservice`: Contains configuration of the webservice in the game application.
- `__config.game.webservice.url`: URL of the game webservice. **(Static)**
- `__config.game.webservice.port`: Port of the game webservice. **(Static)**
- `__config.game.server`: Contains configuration of the server in the game application.
- `__config.game.server.url`: URL of the game server. **(Static)**
- `__config.game.server.port`: Port of the game server. **(Static)**
- `__config.game.checkRedis`: Indicates if the application should check if redis is started before to start the server. Start will fail if Redis isn't started.
- `__config.game.checkMongodb`: Indicates if the application should check if mongod is started before to start the server. Start will fail if mongod isn't started.
- `__config.game.autoStartWebService`: Indicates if the webservice should be started when the game server starts.

- `__config.mongo`: Contains configuration of the mongo database.
- `__config.mongo.error`: Contains configuration for mongodb errors. **(Static)**
- `__config.mongo.error.log`: Path where to store logs. **(Static)**

- `__config.path.base`: Base path of the application. Set in the `bootstrapHelper` script. **(Dynamic)**
- `__config.path.config`: Contains configuration paths.
- `__config.path.config.app`: Application configuration path. Normal priority. **(Static)**
- `__config.path.config.local`: Local configuration path. Higher priority. **(Static)**
- `__config.path.config.shared`: Shared configuration path. Lower priority. **(Static)**


- `__config.cache`: Contains configuration of the cache.
- `__config.cache.lastCacheTimestampFile`: Path of the file where we store the timestamp of the latest cache update. **(Static)**
- `__config.cache.reloadCachedFilesFromGameOnStart`: If true then the server will try to retrieve the latest version of shared files that must be cached and will erase them if there are not up-to-date. Will fail silently if the game webservice isn't reachable. **(Static)**
- `__config.cache.secBeforeReloadCache`: To avoid loop of cached files on automatic restart, you can set the minimum time between two caching attempts. **(Static)**
- `__config.cache.files`: Contains configuration of the cached files.
- `__config.cache.files.config`: Array of files to cache inside the shared/config folder. **(Static)**
- `__config.cache.files.libs`: Array of files to cache inside the shared/app/lib folder. **(Static)**
- `__config.cache.files.core_controllers`: Array of files to cache inside the shared/app/core/conrollers folder. **(Static)**
- `__config.cache.files.core_libs`: Array of files to cache inside the shared/app/core/lib folder. **(Static)**
- `__config.cache.files.core_models`: Array of files to cache inside the shared/app/core/models folder. **(Static)**
- `__config.cache.files.core_services`: Array of files to cache inside the shared/app/core/services folder. **(Static)**
- `__config.cache.files.typescript_def`: Array of files to cache inside the shared/app/lib/def folder. **(Static)**
- `__config.cache.files.globals`: Array of files to cache inside the shared/app/globals folder. **(Static)**
- `__config.cache.files.public`: Array of files to cache inside the shared/app/public folder. **(Static)**

- `__config.cache.validator`: Contains configuration of the validation, used to shared same configuration across applications. (`__validator`) **(Static)**

- `__config.public`: Contains the public config, available from the browser through `__config`. See the `SERVER_CONFIG.md` file for more details. Added while the application starts. **(Dynamic)**
