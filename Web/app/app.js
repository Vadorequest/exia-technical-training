var fs = require('fs'),
    optimist = require('optimist'),
    sails = require('sails');

var sailsRc = __dirname + '/.sailsrc';
var config = optimist.argv;

/*
// Disabled because could have inappropriate behaviour in production.
fs.exists(sailsRc, function(exists){
    if (!exists) return sails.lift(config);

    fs.readFile(sailsRc, 'utf8', function(err, data){
        if (err) {
            console.warn('Error while reading .sailsrc:' + err);
        }

        try {
            config = sails.util.merge(config, JSON.parse(data));
        } catch(e) {
            console.warn('Error while parsing .sailsrc:' + err);
        }

        console.log('Sails running with custom config from .sailsrc: ' + JSON.stringify(config));
        // Start sails and pass it command line arguments
        sails.lift(config);
    });
});*/
console.log('Sails running with config: ' + JSON.stringify(config));

sails.lift(config)