# Web application
I've built the parallax based on the Pixi documentation at http://www.pixijs.com/resources/.

## How to run the application?
In order to make this works, you will need the following to be installed on your computer:

1. node.js
2. npm
3. Once node.js and npm are both installed, go to the `Web\app` folder and run `npm install`,
    this will install all *node.js* dependencies. (Will likely take at least a couple of minutes),
    also run `npm install typescript -g`
    and `npm install less -g` to install general dependencies that aren't referenced in the `package.json`.
4. Once all packages have been installed, run `sails lift` or `node app.js` from the `Web\app` directory.
5. Go to `http://localhost:5500/`.
