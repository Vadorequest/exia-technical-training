///<reference path='./lib/def/defLoader.d.ts'/>
define(["require", "exports", './Cli'], function(require, exports, cli) {
    var Cli = cli.Cli;

    /**
    * Tool to regenerate the generated files from Node servers.
    */
    var Grunt = (function () {
        function Grunt() {
        }
        /**
        * Execute a grunt command.
        * @param args  Args of the command. ('watch')
        */
        Grunt.grunt = function (args) {
            if (typeof args === "undefined") { args = []; }
            Cli.execute(Grunt._command, args, function (command, args, env) {
                console.log('Grunt has been automatically executed. (' + env + ')');
            }, function (command, args, env) {
                console.error('------------- Windows "' + command + '" command failed, trying Unix... ---------------');
            }, function (command, args, env) {
                console.error('------------- Unix "' + command + '" command failed too. ---------------');
            });
        };
        Grunt._command = 'grunt';
        return Grunt;
    })();
    exports.Grunt = Grunt;
});
//# sourceMappingURL=Grunt.js.map
