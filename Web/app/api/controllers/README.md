What's the purpose of this folder?
================================

Basically, all controllers are written here, in the `api/controllers` folder.
They are use to manage HTTP and socket.io request from the client and use some kind of stuff in the background that generates the routes for them automatically.

To access to the controller `userController.js` by HTTP, you just need to call `http://localhost:1337/user`.

Automatically, the `user.index` method will be routed, if the method exists. Else you'll get a 404.


What's the difference between `User.ts` and `userController.js`?
================================================================

Because we use a OOP javascript, we use typescript. (.ts files)
Basically, we use the userController.js, that is native to sails to declare our own methods from the `User.ts` controller.

```
var controller = require('./User').Controllers.User;
module.exports = controller.exports();
```
Basically, here, we import the real controller and we call the `user.exports` method.
This method will returns an object that contains all public methods (and _config) that we want to make public.

But all our methods are written inside the `User.ts` which generates the `User.js` and the `User.map` (which can be used by Chrome to help to debug .ts files)


What's the CoreController.ts file?
==============================

We use OOP, so we use **inheritance**. The `CoreController.ts` is the parent of all the controllers.
It manages many things, a lot of stuff use default values but all can be managed by controller child separately if we want to customize the application.

###What does the **Controller parent** manage?
* Theme: A theme to use in the view. (Specific to our application but could be unused)
* Layout. Takes care of the layout used by the controller, by controller but also by controller action if needed!)
* Default methods. (We are following `Ruby on Rails` rules about the controllers, so we declared some default method that all controllers does have,
    with some magic methods automatically binded in the background, but these methods can be not used, it's not required!)
* Back office / Dashboard. (Manage a sub application part that can be use to basically manage a backoffice, it's just helpers to get the views and layouts without doing anything special)
* `Magic` methods. Many *magic* can be done, due to the inheritance.
    * __beforeEach: A method that can be used to do a lot of work. Is called each time an existing method is found (http/socket.io) **before** the action is called.
    * __before **X**: Where **X** is a predefined method. If you want to add some stuff that will be executed before the index action of ALL you controller is called, it's possible!

We also wanted to add __after but so far it's not done.