The models/ directory contains all Models. Basically a model cannot be required directly, we have to use the **Dao** to require them.
To do so, just use the global object __Dao. You can get the **Model static class** (that is able to create new model instances) or the **model schema**.

The Model will use the dedicated schema.
For instance, models/UserModel will use schema/userSchema. And so on.

How are managed indexes?
========================
Basically, all simple indexes (on only one field) are defined inside the schema.
But complex indexes such as compound indexes must be defined inside the model.

**TypeModel**
```
public static indexes: any = [
    // First array contains the first defined index. Here it's a compound unique index between the name and the category.name.
    [{
        'name': 1,
        'category.name': 1
    }, {
        // This object contains the index options.
        unique: true
    }]
];
```

How use a Model?
================
```
// The first letter can be lower/upper case. But we decided to use lowercase for the first letter so far.
var User = __Dao.getModel('user');// If the model contains several words, you have to respect the capitalization!
var UserHistory = __Dao.getModel('userHistory');// If you use lowercase it will works only on windows. Not on Unix.

var user = new User();// Create a new model user instance. (Empty)
var user = new User({pseudo: 'Vadorequest'});// Create a new model user instance. With data.

user.save(function(error, data){// Save the user. Run the validation schema script and will fail if not correct.
    if(error) console.log(error);
});
```

How retrieve a Model schema?
============================
The same way you can retrieve a Model static class, you can also retrieve the Model schema using the Dao.
```
var userSchema = __Dao.getSchema('user');
```

For instance, this is done in the validatorCustom script.
`api/lib/validatorCustom.js`

It's used to get the schema values, by this way when we change the schema values, all the pre validation (controller side) will use the new values.
Useful when we change a field minLength for instance. Nothing to do more than change the schema.
