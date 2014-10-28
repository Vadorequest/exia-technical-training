Server config (public)
=======================

Here are listed the attributes available in the public config object. All these configuration can be overridden in the `local/serverConfig.json`.

- `__config.private`: Indicates if the object is public or private. Not really used. **(Static)**
- `__config.target`: Indicates if the current target is the browser or the server. Is always `browser` in the public config. **(Static)**
- `__config.environment`: Indicates the current environment. (`development` or `production`) **(Static)**
- `__config.defaultLanguage`: Indicates the default language to use by the application. **(Static)**

- `__config.languages`: Contains configuration of the languages used by the application.
- `__config.languages.messageKey`: Key used in the `Message` class to store the message. **(Static)**
- `__config.languages.argsKey`: Key used in the `Message` class to store the arguments. **(Static)**
- `__config.languages.prefixMessageCode`: Prefix used on the message code, used to ensure that the code isn't a simple text by a code to translate indeed. **(Static)**

- `__config.schemas`: Array of the public schemas, used to shared same validation in client and server. **(Static)**
