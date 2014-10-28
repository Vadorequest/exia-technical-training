# Lib
**The files in this folder are both shared between the servers and also with the browser,
some of them can also be used in other applications.**

**They must be compiled in AMD.**

- **AntiForce**:        In charge of the protection of the application to protect against to much authentication tries. Basically anti brut force.
- **chatValidator**:    Contains some security for the chat.
- **Lang**:             Server version of the Lang, no difference yet but that's because I simplified the process.
- **Request**:          In charge of send request to external application. The default config host is the game itself.
- **token**:            Helper to deal with the pomelo token.
- **validator**:        Validator in charge of protecting against all bad entries, auto response, manage errors.
                            Used when we need to make sure that data send from the client are valid.