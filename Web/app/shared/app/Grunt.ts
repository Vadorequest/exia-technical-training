///<reference path='./lib/def/defLoader.d.ts'/>

import cli = require('./Cli');
var Cli = cli.Cli;

/**
 * Tool to regenerate the generated files from Node servers.
 */
export class Grunt {

    /**
     * Command name to execute.
     * @type {string}
     * @private
     */
    private static _command: string = 'grunt';

    /**
     * Execute a grunt command.
     * @param args  Args of the command. ('watch')
     */

    public static grunt(args: string[] = []){
        Cli.execute(Grunt._command, args, function(command, args, env){
            console.log('Grunt has been automatically executed. ('+env+')');

        }, function(command, args, env){
            console.error('------------- Windows "' + command + '" command failed, trying Unix... ---------------');

        }, function(command, args, env){
            console.error('------------- Unix "' + command + '" command failed too. ---------------');
        });
    }
}