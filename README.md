 # sails-util-micro-apps

[![NPM](https://nodei.co/npm/sails-util-micro-apps.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sails-util-micro-apps/)

Inject a micro-APP into a main Sails from a hook. The micro-app is a mini sails app with a conventional sails dir structure. Source directory structure can be specified or ignored, in which case it loads from the hook's root dir. In a nutshell point the module's loader to an app dir structure and it will load it.

This approach allows you to make mini app's that you can reuse in a larger apps, thereby adopting a micro-services architecture in Sails.

### Features & Recommendations
- You can create new a micro-APP in a hook's root dir, and have them loaded into the main Sails app using this module's loader
- Inject new models, controllers (both traditional and standalone actions), helpers, services, configs and policies
- You can even extend models/controllers/etc already existing in your main Sails app with specific methods/properties from your micro-APP *
- Reuse code with confidence as you can test it in a mini-integrated app before integrating it into larger multiple apps
- Share micro-apps with other engineers
- Supports and written for Sails v1
- Simple intuitive loader interface

NB: * take with a grain of salt

## Installation

You have to install it in the project you intend to inject the micro-apps.

Run this command to install and add the package as a dependency in your package.json :

```cli
npm install --save sails-util-micro-apps
```

## How to use it

You can find a complete hook example below or see tests [test folder](https://github.com/emahuni/sails-util-micro-apps/tree/master/test), [see below](#testing) for explanation.

Using this module is pretty easy.

In your hook's `index.js` file (`parentModule`), require this module and pass your Sails app as first argument. The second argument is the api dir, which is the micro-app's root directory (`microAppRootDir`), which defaults to: `parentModule.__dirname`:
```js
    module.exports = function(sails) {
        var loader = require('sails-util-micro-apps')(sails, 'path/to/micro-app/rootdir/');

        // or
        // var loader = require('sails-util-micro-apps')(sails); /* defaults to this __dirname */

        //... do other stuff

        return {
            initialize: function (next) {
                // ... do other stuff
            }
        };
    };
```

### Loading config / policies

You can load config and policies with the `configure` method.
This method is synchronous and MUST be called before the hook initialisation, outside the initialize method.
If you don't want/need to load config or policies, you don't have to call this method.

Use it like this (complete example below):
```js
    // Automatically load policies and configuration under microAppRootDir's (see above for definition) ./api/policies and ./config/
    loader.configure();
```
Or like this if you want to load from specific directories:
```js
    loader.configure({
        policies:  '/absolute/path/to/policies/',  // Path to the policies to load, it must be absolute
        config: '/absolute/path/to/config/' // Path to the config to load, it must be absolute
    });
```

### Loading models / controllers / helpers / services

To load models, controllers, helpers and services, call the `inject` method.
This method is asynchronous and must be called after the `configure` method.

Use it like this (complete example below):
```js
    /*
				Automatically:
        Load models under microAppRootDir's ./api/models
        Load controllers under microAppRootDir's ./api/controllers
				Load helpers under microAppRootDir's ./api/helpers
        Load services under microAppRootDir's ./api/services
    */
    loader.inject(function (err) {
        return next(err);
    });
```
Or like this if you want to load from specific directories:
```js
    loader.inject({
        controllers: '/absolute/path/to/controllers', // Path to the controllers to load, it must be absolute
        models: '/absolute/path/to/models', // Path to the models to load, it must be absolute
        helpers: '/absolute/path/to/helpers' // Path to the helpers to load, it must be absolute
        services: '/absolute/path/to/services' // Path to the services to load, it must be absolute
    }, function (err) {
        return next(err);
    });
```

### Complete example

Here is a complete example. It's the `index.js` file of a Sails hook.
```js
    module.exports = function(sails) {
        var loader = require('sails-util-micro-apps')(sails); // infere the root micro-app dir automatically

        // Load policies under hook's ./api/policies and config under ./config
        loader.configure();

        /*
            OR if you want to set a custom path :

            loader.configure({
                policies: __dirname + '/api/policies',// custom Path to policies
                config: __dirname + '/config'// custom Path to config
            });
         */

         // ... do other stuff

        return {
            initialize: function (next) {
                /*
                    Load models under hook's ./api/models
                    Load controllers under hook's ./api/controllers
                    Load helpers under hook's ./api/helpers
                    Load services under hook's ./api/services
                */
                loader.inject(function (err) {
                    return next(err);
                });

                /*
                    OR if you want to set a custom path :

                    loader.inject({
                        controllers: __dirname + '/controllers', // custom path to controllers
                        models: __dirname + '/models', // custom path to models
                        helpers: __dirname + '/helpers' // custom path to helpers
                        services: __dirname + '/services' // custom path to services
                    }, function (err) {
                        return next(err);
                    });
                 */

                 // ... do other stuff
            }
        };
    }
```

## Development

### Testing

Complete usage can be found in [`test` dir](https://github.com/emahuni/sails-util-micro-apps/tree/master/test). In a nutshell:
- Tests use mocha and chai, therefore run mocha (globally installed) from the project dir
- Tests Bootstrap (`test/helpers/bootstrap.js`) loads a normal sails app: `test/fixtures/app/`
- Bootstrap loads 2 hooks around the ORM:
  - BeforeORM - `test/fixtures/sails-hook-before-orm/`
  - AfterORM - `test/fixtures/sails-hook-after-orm/`
- Each of these hooks load it's own micro-app using this module in its `index.js` file
- The tests assert the loaded app as a tests control and micro-apps as the tests

You can learn usage example from there.

### Contributing

Please follow the [Felix's Node.js Style Guide](https://github.com/felixge/node-style-guide).

We use [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) for the NPM package.

### Author

- [Emmanuel Mahuni](https://github.com/emahuni)


### Attributions

Hard forked from sails-util-mvcsloader by:

- [Leeroy Brun](https://github.com/leeroybrun)
- [Jimmy Aumard](https://github.com/jaumard)

no maintenance so had to redo it for sails 1 and a lot of new features and bug fixes

Sails internal hooks loading mechanisms, thanks Balderdashy

- [Sails](https://github.com/balderdashy/sails)


### TODO
- Add support for loading :
    - Views
    - Assets
    - Hooks
- Add Grunt for auto-JSHint & tests