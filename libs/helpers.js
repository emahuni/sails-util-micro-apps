/**
 * Load helpers from a directory into a Sails app
 */

var async = require('async');
var _ = require('lodash');
var buildDictionary = require('sails-build-dictionary');

module.exports = function (sails, dir, cb) {
    async.waterfall([function loadHelpersFromDirectory(next) {
        buildDictionary.optional({
            dirname: dir,
            filter: /^([^.]+)\.(js|coffee|litcoffee)$/,
            replaceExpr: /^.*\//,
            flattenDirectories: true
        }, next);

    }, function injectHelpersIntoSails(modules, next) {
        sails.helpers = _.merge(modules || {}, sails.helpers || {});
        
        if (sails.config.globals.helpers) {
            _.each(modules, function (helper, helperId) {
                global[helper.globalId] = helper;
            });
        }

        return next(null);
    }], function (err) {
        return cb(err);
    });
};
