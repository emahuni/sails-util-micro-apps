/**
 * Load models from a directory into a Sails app
 */

const buildDictionary = require('sails-build-dictionary');

module.exports = function(sails, dir, cb) {
    // sails.log.info(`dir: %s, cb: %s`, dir, cb);
    // sails.log.info(`sails models: `, sails.models);

    buildDictionary.optional({
        dirname: dir,
        filter: /^([^.]+)\.(js|coffee|litcoffee)$/,
        replaceExpr: /^.*\//,
        flattenDirectories: true
    }, function(err, models) {
        if (err) {
            return cb(err);
        }

        // Get any supplemental files
        buildDictionary.optional({
            dirname: dir,
            filter: /(.+)\.attributes.json$/,
            replaceExpr: /^.*\//,
            flattenDirectories: true
        }, function(err, supplements) {
            if (err) {
                return cb(err);
            }

            let finalModels = _.merge(models, supplements);

            sails.hooks.orm.models = _.merge(finalModels || {}, sails.hooks.orm.models || {});
            sails.models = _.merge(finalModels || {}, sails.models || {});

            cb();
        });
    });
};
