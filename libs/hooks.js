/**
 * Load hooks from a spcefied directory into a Sails app
 * Basically this a micro-app dir structure and the micro-app depends on these hooks.
 * Since the Micro app is an entity that runs on its own having other micro-apps in it
 * makes it much more plugable.
 * This loads hooks that may contain other micro-apps or some other hook.
 * it loads the hooks from node_modules dir governed by package.json and from the api/hooks dir
 * just as a normal sails app would do
 */

const _ = require('lodash');
const loadHooks = require('sails/lib/app/private/loadHooks');

module.exports = function (sails, dir) {
  sails.log.info(`Micro-Apps: Injecting Hooks micro-app dir: `, dir);

  // backup appPath first
  appPath = sails.config.appPath;

  // setup ourtemp hooks staging area, pretend the micro app root dir is the app's root dir.
  // This is so that we can leverage Sails code to do what it was designed to do without much hacking
  sails.config.appPath = dir;

  // Get the hooks definitions in this micro-app
  sails.modules.loadUserHooks(function doneLoadingUserHooks(err, hooksNew) {
    // sails.log.debug('loaded hooksNew: ', hooksNew);
    // 1st merge and restore backups coz if there is an error at least these things should be as they were
    sails.config.appPath = appPath;

    // now check the error if it is there
    if (err) {
      throw err;
    }

    // get the init Hooks function
    const initHooks = loadHooks(sails);

    // Resolve hooks definitions and finish loading them
    initHooks(hooksNew, function doneInitHooks(err){
      if (err) {
        throw err;
      }

      // sails.log.debug('hooksNew after hooks init: ', hooksNew);
    });
  });

};
