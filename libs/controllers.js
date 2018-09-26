/**
 * Load controllers from a directory into a Sails app
 */

const async = require('async');
const _ = require('lodash');
const buildDictionary = require('sails-build-dictionary');
const utils = require(__dirname + '/utils');

module.exports = function (sails, dir, cb) {
  async.waterfall([// Load controllers from the given directory
    function loadModulesFromDirectory (next) {
      buildDictionary.optional({
        dirname: dir,
        filter: /(.+)Controller\.(js|coffee|litcoffee)$/,
        flattenDirectories: true,
        keepDirectoryPath: true,
        replaceExpr: /Controller/
      }, next);
    },

    // Bind all controllers methods to sails
    function bindControllersToSails (modules, next) {
      utils._bindToSails(sails, modules, next);
    },

    // Register controllers on the main "controllers" hook
    function registerControllers (modules, next) {
      // Extends sails.controllers with new ones
      sails.controllers = {...modules, ...sails.controllers};

      // Loop through each controllers and register them
      _.each(modules, function (controller, controllerId) {
        // Register this controller's actions
        _.each(controller, function (action, actionId) {
          // actionid is always lowercase
          actionId = actionId.toLowerCase();
          // If the action is set to `false`, explicitly disable (remove) it
          if (action === false) {
            delete sails.hooks.userhooks.middleware[controllerId][actionId];
            return;
          }

          // Do not register string or boolean actions
          if (_.isString(action) || _.isBoolean(action)) return;

          // LastCallsController.getActiveOrder
          sails.registerAction(action, [controllerId, actionId].join('/'));

          /*           // Register controller's action on the main "controllers" hook
                       action._middlewareType = 'ACTION: ' + controllerId + '/' + actionId
                       sails._actions[controllerId] = sails._actions[controllerId] || {}
                       sails._actions[controllerId][actionId] = true */
        });
      });

      return next();
    }], (err) => {
      cb(err);
    });
}
