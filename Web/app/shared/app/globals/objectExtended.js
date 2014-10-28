/**
 * Extends object both client and server side.
 */

var _super =  typeof global !== 'undefined' ? global : window;

/**
 * Extends Object with __stack function to get the stack at any time.
 */
Object.defineProperty(_super, '__stack', {
    get: function() {
        var orig = Error.prepareStackTrace;
        Error.prepareStackTrace = function(_, stack) {
            return stack;
        };
        var err = new Error;
        Error.captureStackTrace(err, arguments.callee);
        var stack = err.stack;
        Error.prepareStackTrace = orig;
        return stack;
    }
});

/**
 * Extends Object with __line function to get the line at any time.
 */
Object.defineProperty(_super, '__line', {
    get: function() {
        return __stack[1].getLineNumber();
    }
});

/**
 * Extends Object with __function function to get the current function name at any time,
 * or the content of the function it it's anonymous.
 */
Object.defineProperty(_super, '__function', {
    get: function() {
        return __stack[1].getFunctionName();
    }
});