/**
 * Load config from a directory into a Sails app
 */

const includeAll = require('include-all');
const _ = require('lodash');


module.exports = function (sails, dir) {
  sails.log.verbose(`Micro-Apps: Injecting configs from dir: `, dir);

  includeAll.optional({
    dirname: dir,
    exclude: ['locales', 'local.js', 'local.json', 'local.coffee', 'local.litcoffee'],
    excludeDirs: /(locales|env)$/,
    filter: /(.+)\.(js|json|coffee|litcoffee)$/,
    identity: false
  }, function (err, configs) {
    if (err) sails.log.error(err);

    // make sure they are one level in
    configs = _.reduce(configs, (_configs, o, k)=>_.merge(_configs, o) );
    // sails.log.debug('configs: ', configs);

    sails.config = _.merge(configs, sails.config, (a, b) => _.isArray(a) ? a.concat(b) : undefined);

    // Using this hack to reset and bind our policies to router
    // sails.log.debug('action middleware: ', sails._actionMiddleware);
    sails._actionMiddleware = {}; // cozing bug if array (I am not sure if this works perfectly well, need to put action middleware and see)
    sails.router.flush();
  });
};
