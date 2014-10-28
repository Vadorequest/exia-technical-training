define(["require", "exports"], function(require, exports) {
    /**
    * That used to get the number of attempt connexion of an IP or on account
    * It's used to prevent Brute Force || Flood connexion on server
    */
    var LogAttempt = (function () {
        function LogAttempt() {
            /**
            * The last logging attempt
            */
            this.lastAttempt = Date.now();
            /**
            * Allow to check if IP is locked temporary
            */
            this.locked = false;
            /**
            * The sum of logging attempt
            */
            this.loginAttempt = 0;
            // Empty
        }
        /**
        * Add a connect attemptand return if account is locked or not
        */
        LogAttempt.prototype.addAttempt = function () {
            // Authorizes 1 connexion all 10 secs
            // TODO Define time later
            if (this.lastAttempt > Date.now() - 10000) {
                this.loginAttempt++;
            }

            // Update attempt time
            this.lastAttempt = Date.now();

            // Check the number of logging attempt and lock account if we need
            if (this.loginAttempt > 5) {
                this.locked = true;
                return true;
            }

            return false;
        };

        /**
        * Get the number of connexion attempt
        */
        LogAttempt.prototype.getAttempt = function () {
            return this.loginAttempt;
        };

        /**
        * Get the locked status
        */
        LogAttempt.prototype.getLocked = function () {
            return this.locked;
        };

        /**
        * Check if user||account is locked
        */
        LogAttempt.prototype.isLocked = function () {
            // If user IP is locked || Account, check the time to unlock him
            if (this.locked) {
                // Check if last logging attempt is more than 5 minutes
                if (this.lastAttempt < (Date.now() - (1000 * 60 * 5))) {
                    this.locked = false;
                    this.loginAttempt = 0;

                    // Account is now unlock, add an attempt
                    this.addAttempt();

                    // And say account was not locked
                    return false;
                } else {
                    // Account is locked for the moment...
                    return true;
                }
            } else {
                // Account is not locked for moment, but add an attempt and get it back
                return this.addAttempt();
            }
        };
        return LogAttempt;
    })();
    exports.LogAttempt = LogAttempt;

    var AntiForce = (function () {
        function AntiForce() {
            console.log('ANTI FORCE was Build');
        }
        /**
        * Check how much an account receive a connection attempt and blocks him where brute force
        * @param accountLogin                  The account login checked
        */
        AntiForce.checkAccountAttempt = function (accountLogin) {
            // Get account name
            var accLog = accountLogin.toLowerCase();

            // Check if account is in memory
            if (!this.accLogList[accLog]) {
                this.accLogList[accLog] = new LogAttempt();
            }

            // For DEBUG
            console.log('Account login attempt : ' + accountLogin + " | Number of Attempt : " + this.accLogList[accLog].getAttempt() + " | Account locked : " + this.accLogList[accLog].getLocked());

            // Get back the result of login attempt
            return !this.accLogList[accLog].isLocked();
        };

        /**
        * Check how much attempt an user send try connect to an account and block him where brute force tentative
        * @param userIP                        The user IP checked
        */
        AntiForce.checkUserAttempt = function (userIP) {
            // Check if IP is in memory
            if (!this.IPLogList[userIP]) {
                this.IPLogList[userIP] = new LogAttempt();
            }

            // For DEBUG
            console.log('IP try connect attempt | IP : ' + userIP + " | Number of Attempt : " + this.IPLogList[userIP].getAttempt() + " | IP locked : " + this.IPLogList[userIP].getLocked());

            // Get back the result of login attempt
            return !this.IPLogList[userIP].isLocked();
        };
        AntiForce.IPLogList = [];

        AntiForce.accLogList = [];
        return AntiForce;
    })();
    exports.AntiForce = AntiForce;
});
//# sourceMappingURL=AntiForce.js.map
