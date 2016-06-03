'use strict';

const Hoek = require('hoek');
const Joi = require('joi');

module.exports = {
    name: 'loveboat-defaults',
    root: null,
    match: Joi.any(),
    handler: function (root, route, server, options) {

        return Hoek.applyToDefaultsWithShallow(options.defaults, root, options.shallow || []);
    }
};
