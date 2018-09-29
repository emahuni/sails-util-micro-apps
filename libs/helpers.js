/**
 * Load helpers from a directory into a Sails app
 */

const _ = require('lodash');
const loadHelpers = require('sails/lib/hooks/helpers/private/load-helpers');

module.exports = function (sails, dir, cb) {
  // temp sails app
  // let tmpSails = {
  //   config: {
  //     helpers: {},
  //     paths: {},
  //   },
  // };

  // _.merge(tmpSails.config.helpers, sails.config.helpers);
  // tmpSails.config.paths.helpers = dir;

  // sails.log.debug('tmpSails: ', tmpSails);

  // tmpSails.log = sails.log;

  // backup existing helpers info
  let helpers = _.cloneDeep(sails.helpers),
      helpersPath = sails.config.paths.helpers;

  // setup our temp helpers staging area
  sails.helpers = {}; // clear em
  sails.config.paths.helpers = dir;

  // load requested helpers
  loadHelpers(sails, function(err) {
    // 1st merge and restore backups coz if there is an error at least these things should be as they were
    sails.config.paths.helpers = helpersPath;
    let helpersNew = _.cloneDeep(sails.helpers);
    sails.helpers = helpers;

    // now check the error if it is there
    if (err) { return cb(err); }

    _.merge(sails.helpers, helpersNew); // overwrite the old ones if so desired

    // sails.log.debug('after sails helpers injection: ', sails.helpers);
    // sails.log.debug('helpers path: ', sails.config.paths.helpers);

    return cb();
  });
}
