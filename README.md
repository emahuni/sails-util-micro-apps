 # sails-util-micro-apps

[![NPM](https://nodei.co/npm/sails-util-micro-apps.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sails-util-micro-apps/)

Load micro-APP (models, controllers, helpers, services, config and policies) from a hook directory structure or specified directories and inject them into the main Sails app. Point the module's loader to an app dir structure and it will load it. This approach allows you to make mini app's that you can reuse in a larger apps, thereby adopting a micro-services architecture.

This is partically usefull and recommended to extend your Sails app from hooks.

You can create new a micro-APP in a hook's root dir, and have them loaded into the main Sails app using this module's loader.
You can even extend models/controllers/etc already existing in your main Sails app with specific methods/properties from your micro-APP.

## Installation

You have to install it in the project you intend to load the models/controllers/etc. using `npm install` in the project you are injecting into.

Run this command to install and add the package as a dependency in your package.json :

```cli
npm install --save sails-util-micro-apps
```

## How to use it

You can find a complete hook example in the [example folder](https://github.com/emahuni/sails-util-micro-apps/tree/master/example/sails-hook-eg).

Using this module is pretty easy.

In your hook's index.js file or whatever module (now referred as parentModule) that intends to inject a micro-APP, require this module (module) and pass your Sails app as first argument ([optional] second argument for the micro app directory (now reffered as microAppRootDir) to use - defaults to: parentModule.__dirname):
```js
    module.exports = function(sails) {
        var loader = require('sails-util-micro-apps')(sails, __dirname); // the api dir used here is optional and is the same as the default, this is just to show eg.

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
This method is asynchronous and must be called after the `configure` method (presented above, if needed).

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
    loader.adapt({
        controllers: '/absolute/path/to/controllers', // Path to the controllers to load, it must be absolute
        models: '/absolute/path/to/models', // Path to the models to load, it must be absolute
        services: '/absolute/path/to/services' // Path to the services to load, it must be absolute
    }, function (err) {
        return next(err);
    });
```

### Complete example

Here is a complete example. It's the index.js file of a Sails hook.
```js
    module.exports = function(sails) {
        var loader = require('sails-util-micro-apps')(sails);

        // Load policies under hook's ./api/policies and config under ./config
        loader.configure();
    
        /*
            OR if you want to set a custom path :

            loader.configure({
                policies: __dirname + '/api/policies',// custom Path to policies
                config: __dirname + '/config'// custom Path to config
            });
         */
    
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
            }
        };
    }
```

## Development

### Contributing

For now, we use 4 spaces instead of 2.  
For the rest, please follow the [Felix's Node.js Style Guide](https://github.com/felixge/node-style-guide).

We use [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) for the NPM package.

### Contributors

- [Emmanuel Mahuni](https://github.com/emahuni)


### Attributions

hard forked from sails-util-mvcsloader by:

- [Leeroy Brun](https://github.com/leeroybrun)
- [Jimmy Aumard](https://github.com/jaumard)

no maintenance so had to redo it for sails 1

### TODO
- Add support for loading :
    - Views
    - Assets
    - Hooks
- Add tests
- Add Grunt for auto-JSHint & tests