/**
 * denyApp
 *
 * @module      :: Policy
 * @description :: test policy denying
 * @help        :: http://sailsjs.org/#!/documentation/concepts/Policies
 */
module.exports = function(req, res, next) {
  sails.log.debug('deny before route pointing to this policy denyBefore.js');
  return res.forbidden();
};
