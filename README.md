# loveboat-defaults
support hapi route configuration defaults

(a transform written for [**loveboat**](https://github.com/devinivy/loveboat))

[![Build Status](https://travis-ci.org/devinivy/loveboat-defaults.svg?branch=master)](https://travis-ci.org/devinivy/loveboat-defaults) [![Coverage Status](https://coveralls.io/repos/devinivy/loveboat-defaults/badge.svg?branch=master&service=github)](https://coveralls.io/github/devinivy/loveboat-defaults?branch=master)

Lead Maintainer - [Devin Ivy](https://github.com/devinivy)

## Usage
In hapi route defaults can be specified for a connection, but not on a per-plugin basis.  This loveboat transform allows you to define route defaults per plugin.

To use this transform,

1. Make sure the [loveboat](https://github.com/devinivy/loveboat) hapi plugin is registered to your server.
2. Tell loveboat that you'd like to use this transform by calling,
    ```js
    server.routeTransforms([{
        transform: require('loveboat-defaults'),
        options: {
            defaults: {/* Specify route defaults */}
        }
    }]);
    ```

    and possibly listing any other transforms you'd like to use.*

3. Register your routes using `server.loveboat()` rather than `server.route()`.

<sup>* There are other ways to tell loveboat which transforms to use too!  Just check-out the [readme](https://github.com/devinivy/loveboat/blob/master/README.md).

```js
const Hapi = require('hapi');
const Loveboat = require('loveboat');

const server = new Hapi.Server();
server.connection();

// 1. Register loveboat
server.register(Loveboat, (err) => {

    // 2. Tell loveboat to use this transform,
    //    specifying your route defaults
    server.routeTransforms([{
        transform: require('loveboat-defaults'),
        options: {
            defaults: {
                config: {
                    cache: {
                        privacy: 'public'
                    }
                }
            }
        }
    }]);

    // 3. Configure your routes!
    // This route will have public caching enabled
    server.loveboat({
        method: 'get',
        path: '/some/endpoint',
        handler: handler
    });

});
```

## API
### Options
The options for this transform should be an object of the format,
  - `defaults` - an object specifying route configuration defaults.
  - `shallow` - (optional) an array of strings specifying route config keys that should be shallow copied rather than merged deeply when applying defaults.  See [`Hoek.applyToDefaultsWithShallow()`](https://github.com/hapijs/hoek/blob/master/API.md#applytodefaultswithshallowdefaults-options-keys).
