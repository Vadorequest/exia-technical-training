# Private
**The files in this folder are not shared with other applications nor the browser.
But they are shared between the servers in this application.**

- If a file named `bootstrapHelper.js` exists in the `shared/app/private/` folder it will be automatically loaded just after our bootstrapHelper services was executed and before the usual sails `config/bootstrap` is run.