# Public
**The files in this folder are both shared between the servers and also with the browser,
some of them can also be used in other applications.**

**They must be compiled in AMD.**

- **languages**: Contains the language files that are used in both server and browser. There are not shared across applications.
    - languages.json: Contains all authorized languages.
    - *$lang*.json: Contains all the sentences for a specific language.

The classes in this folder are really important and must be compatible across application but also from browser and server side.

- **AStar**:            A star algorithm. Basically to find the shorter path between two elements on the map.
- **Format**:           Format, used to always use the same kind of objects. Format response from the server to the client and JSON.
- **Lang**:             Lang (i18N) management for the client side. Manage also some specific things linked to the server part to make it easier to use.
- **Message**:          A message is an object that we use everywhere to transfer data between application or to communicate, extremely important.
- **MessageLang**:      The messageLang is the same as message but is used to deal with a language sentence, manage dynamic variables inside sentences and so on.
                            Used by the message class to contains the message to display.
- **ValidatorMessage**: The validatorMessage is based on the message but manage a group of messages (errors basically) and contains methods to help to deal with these messages.
                            Basically used by the global validator.