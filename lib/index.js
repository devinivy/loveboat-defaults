'use strict';

const Hoek = require('hoek');

module.exports = {
    name: 'loveboat-defaults',
    root: null,
    match: (value) => { // Match everything

        return { value, error: null };
    },
    handler: (root, route, server, options) => {

        return Hoek.applyToDefaultsWithShallow(options.defaults, root, options.shallow || []);
    }
};
