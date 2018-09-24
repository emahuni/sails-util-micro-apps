/**
 * denyApp
 *
 * @module      :: Policy
 * @description :: test policy denying
 * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = function(req, res, next) {

				return res.forbidden();

};
