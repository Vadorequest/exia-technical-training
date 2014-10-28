/**
 * Allow any authenticated user.
 */
module.exports = function (req, res, callback) {

    // User is allowed, proceed to controller
    if (req.session.user && req.session.user.connected) {
        return callback();
    } else {
        // User is not allowed
        return res.forbidden('You are not permitted to perform this action.');
    }
};