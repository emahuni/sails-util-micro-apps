/**
 * Load controllers from a directory into a Sails app
 */

var async = require('async');
var _ = require('lodash');
var buildDictionary = require('sails-build-dictionary');
var utils = require(__dirname + '/utils');

module.exports = function (sails, dir, cb) {
    async.waterfall([// Load controllers from the given directory
        function loadModulesFromDirectory(next) {
            buildDictionary.optional({
                dirname: dir,
                filter: /(.+)Controller\.(js|coffee|litcoffee)$/,
                flattenDirectories: true,
                keepDirectoryPath: true,
                replaceExpr: /Controller/
            }, next);
        },

        // Register controllers, extends sails.controllers with new ones
        function registerControllers(modules, next) {
            // Loop through each controllers and register them
            _.each(modules, function (controller, controllerId) {
								// use sails register action
								sails.registerAction(controller, controllerId);								
            });

            return next();
        }], function (err) {
        cb(err);
    });
};
