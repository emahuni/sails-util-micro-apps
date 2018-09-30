/**
 * Load hooks from a directory into a Sails app
 */

const _ = require('lodash');

module.exports = function (sails, dir) {
  sails.log.info(`Micro-Apps: Injecting Hooks from dir: `, dir);

  // backup existing hooks info
  let hooks = _.cloneDeep(sails.hooks),
      hooksPath = sails.config.paths.hooks;

  // setup our temp hooks staging area
  // sails.hooks = {}; // clear em
  sails.config.paths.hooks = dir;

  // load requested hooks
  sails.modules.loadUserHooks(function(err, hooksNew) {
    // sails.log.debug('after sails hooks injection: ', _.keys(hooksNew));
    // 1st merge and restore backups coz if there is an error at least these things should be as they were
    sails.config.paths.hooks = hooksPath;
    // let hooksNew = _.cloneDeep(sails.hooks);
    // sails.hooks = hooks;

    // now check the error if it is there
    // if (err) { return cb(err); }

    // _.merge(sails.hooks, hooksNew); // overwrite the old ones if so desired

    sails.log.debug('after sails hooks injection: ', _.keys(sails.hooks));
    sails.log.debug('hooks path: ', sails.config.paths.hooks);

    // return cb();
  });

};
