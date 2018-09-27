/**
 * Load policies from a directory into a Sails app
 */

const _ = require('lodash');
const loadPolicies = require(__dirname + '/sails/_loadPolicies');

module.exports = function (sails, dir) {
  sails.log.verbose(`Micro-Apps: Injecting policies from dir: `, dir);

  // Adaptation needed for policies
  if (_.isArray(sails.config.paths.policies)) {
    sails.config.paths.policies.push(dir);
  } else {
    sails.config.paths.policies = [sails.config.paths.policies, dir];
  }

  sails.modules.loadPolicies = loadPolicies;
  _.bind(sails.modules.loadPolicies, sails.modules);
}
