/**
 * Load app policies
 *
 * @param {Object} options
 * @param {Function} cb
 */
const async = require('async')
const _ = require('lodash')
const buildDictionary = require('sails-build-dictionary')

module.exports = function (cb) {
  async.reduce(sails.config.paths.policies, {}, function (prev, curr, callback) {
    buildDictionary.optional({
      dirname: curr,
      filter: /(.+)\.(js|coffee|litcoffee)$/,
      replaceExpr: null,
      flattenDirectories: true,
      keepDirectoryPath: true
    }, (err, policies) => {
      if (err) callback(err)
      callback(null, _.merge(prev, policies))
    })
  }, cb)
}
