/**
 * Load controllers from a directory into a Sails app
 */

const async = require('async');
const _ = require('lodash');
const includeAll = require('include-all');
const utils = require(__dirname + '/utils');

module.exports = function (sails, dir, cb) {
  async.waterfall([
    // Load controllers from the given directory
    function loadModulesFromDirectory (next) {
      includeAll.optional({
        dirname: dir,
        filter: /(.+)\.(js|coffee|litcoffee)$/,
        flatten: true,
        keepDirectoryPath: true,
        replaceExpr: /Controller/,
      }, next);
    },

    // Bind all controllers methods to sails
    function bindControllersToSails (modules, next) {
      // sails.log('modules: ', util.inspect(modules));
      utils._bindToSails(sails, modules, next);
    },

    // Register controllers on the main "controllers" hook
    function registerControllers (modules, next) {
      // Loop through each controllers and register them
      _.each(modules, function (controller, controllerId) {
        // sails.log.debug('controller:', controller, 'controllerId: ', controller.identity);

        // cater for standalone actions (machine-pack)
        if (controller.fn && controller.globalId && controller.identity){
          // this is a standalone action
          sails.log.verbose('Micro-Apps: register standalone action: ', controller.identity);

          // If the action function is set to `false`, explicitly disable (remove) it
          if (controller.fn === false) {
              delete sails._actions[controller.identity];
              return;
          }

          // register the action
          sails.registerAction(controller, controller.identity);

        } else  if (controller.globalId && controller.identity) {
          // this is a traditional controller
          sails.log.verbose('Micro-Apps: register controller: ', controller.identity);

          // Register this controller's actions
          _.each(controller, function (action, actionId) {
            // create the proper actionid and make sure it is lowercase
            actionId = [controller.identity, actionId.toLowerCase()].join('/');

            // If the action is set to `false`, explicitly disable (remove) it
            if (action === false) {
              delete sails._actions[actionId];
              return;
            }

            // Do not register anything that is not a function
            if (!_.isFunction(action)) return;

            // sails.log.verbose('Micro-Apps: register controller action: ', action, ' actionId: ', actionId);

            // register the action
            sails.registerAction(action, actionId);
          });
        } else {
          // throw error, this is not a controller or standalone action
        }
      });

      return next();
    },

  ], (err) => {
    cb(err);
  });
}
