# Globals
These file are mostly scripts that are globally accessible such as the **debug** ofr the **functions**.
But there are also loaders, used by the **bootstrap** (sails) to load all services,
extends other objects such as lodash or the native javascript **Object** class.

**The variables script is not shared across other applications**.

## Do not forget to:
**Add the file name in the `_serverConfig.json` file to allow child application to download it by default.**