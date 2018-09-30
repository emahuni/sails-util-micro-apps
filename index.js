const async = require('async'),
      path = require('path'),
      util = require('util'),
      decache = require('decache');

module.exports = function(sails, hook_dirname) {
  // make sure we don't cache this module, caching is preventing hook_dirname detection from working properly
  decache(module.id);

  if (!sails) {
    console.log(sails);
    throw new Error ('Error! The Sails app passed to sails-util-micro-apps seems invalid.');
  }

  hook_dirname = hook_dirname || path.dirname(module.parent.filename);

  // sails.log.debug('sails: ', util.inspect(sails, {customInspect: false}));
  // sails.log.debug('attempting to instantiate util');
  // check if the Archive model has been exposed (past stage 5 of Sails app lifecycle), if this was being called from a hook then it'd be before stage 5
  if (sails.isLifted || global['Archive']) throw new Error (`Cannot inject micro-app '${hook_dirname}' after Sails is lifted. Runtime injection not supported at the moment.`);

  const Loader = {
    defaults: {},

    injectHooks: function(dir, cb) {
      require(__dirname + '/libs/hooks')(sails, dir);
    },

    injectPolicies: function(dir) {
      require(__dirname + '/libs/policies')(sails, dir);
    },
    injectConfig: function(dir) {
      require(__dirname + '/libs/config')(sails, dir);
    },

    injectControllers: function(dir, cb) {
      require(__dirname + '/libs/controllers')(sails, dir, cb);
    },

    injectModels: function(dir, cb) {
      require(__dirname + '/libs/models')(sails, dir, cb);
    },

    injectServices: function(dir, cb) {
      require(__dirname + '/libs/services')(sails, dir, cb);
    },

    injectHelpers: function(dir, cb) {
      require(__dirname + '/libs/helpers')(sails, dir, cb);
    },

    // Inject hooks, config and policies synchronously into the Sails app
    configure: function(dir) {
      if (!dir) {
        dir = {
          hooks: hook_dirname,
          config: hook_dirname + '/config',
          policies: hook_dirname + '/api/policies'
        };
      }
      this.injectAll(dir);
    },

    // Inject models, controllers, helpers & services asynchronously into the Sails app
    inject: function(dir, next) {
      sails.log.debug('hook dirname: ', hook_dirname);
      // No parameters or only a callback (function) as first parameter
      if ((typeof dir === 'function' || !dir) && !next) {
        var tmp = next;
        next = dir || function() {};
        dir = tmp || {
          models: hook_dirname + '/api/models',
          controllers: hook_dirname + '/api/controllers',
          helpers: hook_dirname + '/api/helpers',
          services: hook_dirname + '/api/services'

        };
      }

      // Backward compatibility, next and dir inverted
      else if (typeof next === 'object' && typeof dir === 'function') {
        var tmp = next;
        next = dir;
        dir = tmp;
      }

      // Be sure to have a callback
      next = next || function() {};

      this.injectAll(dir, next);
    },

    injectAll: function(dir, cb) {
      cb = cb || function() {};

      var self = this;

      var loadModels = function(next) {
        self.injectModels(dir.models, function(err) {
          if (err) {
            return next(err);
          }
          sails.log.info('Micro-app-loader: User hook models loaded from ' + dir.models + '.');
          return next(null);
        });
      };

      var loadControllers = function(next) {
        self.injectControllers(dir.controllers, function(err) {
          if (err) {
            return next(err);
          }

          sails.log.info('Micro-app-loader: User hook controllers loaded from ' + dir.controllers + '.');

          return next(null);
        });
      };

      var loadHelpers = function(next) {
        self.injectHelpers(dir.helpers, function(err) {
          if (err) {
            return next(err);
          }
          sails.log.info('Micro-app-loader: User hook helpers loaded from ' + dir.helpers + '.');
          return next(null);
        });
      };

      var loadServices = function(next) {
        self.injectServices(dir.services, function(err) {
          if (err) {
            return next(err);
          }
          sails.log.info('Micro-app-loader: User hook services loaded from ' + dir.services + '.');
          return next(null);
        });
      };


      sails.log.debug('dirs: ', dir);

      // we should add dependant hooks early during config before hooks are initialized
      if (dir.hooks) {
        self.injectHooks(dir.hooks);
        sails.log.info('Micro-app-loader: Hooks loaded from ' + dir.hooks + '.');
      }

      if (dir.policies) {
        self.injectPolicies(dir.policies);
        sails.log.info('Micro-app-loader: User hook policies loaded from ' + dir.policies + '.');
      }

      if (dir.config) {
        self.injectConfig(dir.config);
        sails.log.info('Micro-app-loader: User hook config loaded from ' + dir.config + '.');
      }

      var toLoad = [];

      if (dir.models) {
        toLoad.push(loadModels);
      }

      if (dir.controllers) {
        toLoad.push(loadControllers);
      }

      if (dir.helpers) {
        toLoad.push(loadHelpers);
      }

      if (dir.services) {
        toLoad.push(loadServices);
      }

      async.parallel(toLoad, function(err) {
        if (err) {
          sails.log.error(err);
        }
        if (cb) {
          cb(err);
        }
      });
    }};
  // Backward compatibility
  Loader.adapt = Loader.inject;

  return Loader;
};
