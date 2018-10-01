 # sails-util-micro-apps

[![NPM](https://nodei.co/npm/sails-util-micro-apps.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/sails-util-micro-apps/)

Inject self-contained Micro-Apps into your Sails App using a hook. Each micro-app is a mini sails app that you can develop decoupled from your main apps, which you then inject using this util.

This approach allows you to make mini app's that you can reuse in larger apps, thereby adopting a micro-services architecture in Sails.

## Features & Recommendations
- Create micro-apps and use hooks to inject them into your main Sails app via this util
- Each micro-app can contain:
  - models
  - controllers (both traditional and standalone actions)
  - helpers
  - services
  - configs
  - policies
  - routes
  - hooks (yes you can inject hooks into hooks)
  - micro-apps that can contain all of the above
- You can even extend existing modules in your main Sails app with specific methods/properties from your micro-app *
- Reuse code with confidence as you can test it in a self-contained micro-app before integrating it into larger totally unrelated multiple apps
- Since a micro-app can be carried in an installable hook, it can have other hooks and micro-apps that it depends on and carries. When the micro-app is injected via the hook
  the whole shebang is injected into the main app and this means a micro-app can inject other micro-apps that can inject their own micro-apps and so on,
  building more like a dependency tree of micro-apps
- A single hook can inject multiple micro-apps
- Share micro-apps with other engineers
- Supports and written for Sails v1
- Simple intuitive injecter interface

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

### Injecting hooks, config and policies

You can inject hooks, configs and policies with the `configure` method.
This method is synchronous and MUST be called before the hook initialisation, outside the initialize method.
If you don't want/need to inject hooks, configs or policies, you don't have to call this method.

Use it like this (complete hook example below):
```js
    // Automatically inject hooks, policies and configuration under microAppRootDir's ./config/ and hooks sources
    loader.configure();
```
Or like this if you want to inject from specific directories:
```js
    loader.configure({
        hooks:  '/absolute/path/to/hooks/',  // Path to the hooks to inject, it must be absolute
        policies:  '/absolute/path/to/policies/',  // Path to the policies to inject, it must be absolute
        config: '/absolute/path/to/config/' // Path to the config to inject, it must be absolute
    });
```

### Injecting models, controllers, helpers and services

To inject models, controllers, helpers and services, call the `inject` method also alised as adapt.
This method is asynchronous and must be called after the `configure` method.

Use it like this (complete example below):
```js
    /*
       Automatically inject:
        - models under microAppRootDir's ./api/models
        - controllers under microAppRootDir's ./api/controllers
        - helpers under microAppRootDir's ./api/helpers
        - services under microAppRootDir's ./api/services
    */
    loader.inject(function (err) {
        return next(err);
    });
```
Or like this if you want to inject from specific directories:
```js
    loader.inject({
        controllers: '/absolute/path/to/controllers', // Path to the controllers to inject, it must be absolute
        models: '/absolute/path/to/models', // Path to the models to inject, it must be absolute
        helpers: '/absolute/path/to/helpers' // Path to the helpers to inject, it must be absolute
        services: '/absolute/path/to/services' // Path to the services to inject, it must be absolute
    }, function (err) {
        return next(err);
    });
```

### Complete hook example

Here is a complete hook example. It's the `index.js` file of a Sails hook.
```js
    module.exports = function(sails) {
        var loader = require('sails-util-micro-apps')(sails); // infere the root micro-app dir automatically

        // Automatically inject hooks, policies and configs
        loader.configure();

        /*
            OR if you want to set a custom path :

            loader.configure({
                hooks: __dirname,// custom Path to hooks, usually the root of the micro-app
                policies: __dirname + '/api/policies',// custom Path to policies
                config: __dirname + '/config'// custom Path to config
            });
         */

         // ... do other stuff

        return {
            initialize: function (next) {
                /*
                    Automatically inject:
                     - models under hook's ./api/models
                     - controllers under hook's ./api/controllers
                     - helpers under hook's ./api/helpers
                     - services under hook's ./api/services
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

#### Directory Structure

The micro-app hook should have a normal Sails app dir structure when used with the default path:
```
sails-hook-example-micro-app/
  |_index.js                                                <-- hook entry point (example file is above)
  |_package.json                                            <-- for installable hooks (other hooks or micro-apps
  | |_"sails-hook-example-inner-micro-app": "0.1.0"             installed as dependencies; sails convention)
  |_api/                                                    <-- api dir
  | |_hooks/
  | | |_...                                                 <-- this can be other micro-app hooks dependancies
  | |_controllers/
  | | |_...
  | |_models/
  | | |_...
  | |_helpers/
  | | |_...
  | |_services/
  | | |_...
  | |_policies/
  |   |_...
  |_config/
  | |_route.js
  | |_policies.js
  | |_...
  |_node_modules/
    |_sails-hook-example-inner-micro-app/                   <-- a dependency for the micro app being injected
    | |_...                                                 <-- all will be injected as above into main app
    |_...
```

## Development

Any suggestions, PRs, bug fixes, reports etc are welcome.

### Testing

Complete usage can be found in [`test` dir](https://github.com/emahuni/sails-util-micro-apps/tree/master/test). In a nutshell:
- Tests use mocha and chai, therefore run mocha (globally installed) from the project dir
- Tests Bootstrap (`test/helpers/bootstrap.js`) loads a normal sails app: `test/fixtures/app/` that loads a hook micro-app that loads a dependant micro-app
- Bootstrap loads 2 hooks around the ORM:
  - BeforeORM - `test/fixtures/sails-hook-before-orm/`
    - loads a dependant micro-app `BeforeHook`
  - AfterORM - `test/fixtures/sails-hook-after-orm/`
    - loads a dependant micro-app `AfterHook`
- Each of these hooks inject it's own micro-app using this module in its `index.js` file
- The tests assert the injected app as a tests control and micro-apps as the tests

You can learn usage example from there.

### Contributing

Please follow the [Felix's Node.js Style Guide](https://github.com/felixge/node-style-guide).

We use [semantic versioning](https://docs.npmjs.com/getting-started/semantic-versioning) for the NPM package.

### Author

- [Emmanuel Mahuni](https://github.com/emahuni)


### Attributions

Hard forked from [sails-util-mvcsloader](https://github.com/leeroybrun/sails-util-mvcsloader) by:

- [Leeroy Brun](https://github.com/leeroybrun)
- [Jimmy Aumard](https://github.com/jaumard)

no maintenance so had to redo it for sails 1 and a lot of new features and bug fixes

Sails internal hooks loading mechanisms, thanks Balderdashy

- [Sails](https://github.com/balderdashy/sails)


### TODO
- Add support for injecting :
    - Views
    - Assets
- Add Grunt for auto-JSHint & tests