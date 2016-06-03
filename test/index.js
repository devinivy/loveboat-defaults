'use strict';

// Load modules

const Lab = require('lab');
const Code = require('code');
const Hapi = require('hapi');
const Loveboat = require('loveboat');
const LoveboatDefaults = require('..');

// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;

const internals = {};

describe('loveboat-nested-scopes', () => {

    it('applies defaults with shallow properties.', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register(Loveboat, (err) => {

            expect(err).to.not.exist();

            server.routeTransforms({
                transform: LoveboatDefaults,
                options: {
                    shallow: ['config.app'],
                    defaults: {
                        method: 'get',
                        config: { app: { fromDefault: true } }
                    }
                }
            });

            server.loveboat({
                path: '/',
                handler: (request, reply) => reply('ok'),
                config: {
                    app: { fromRoute: true }
                }
            });

            const routes = server.table()[0].table;

            expect(routes).to.have.length(1);
            expect(routes[0].method).to.equal('get');
            expect(routes[0].settings.app).to.equal({ fromRoute: true });
            done();
        });

    });

    it('applies defaults without shallow properties.', (done) => {

        const server = new Hapi.Server();
        server.connection();

        server.register(Loveboat, (err) => {

            expect(err).to.not.exist();

            server.routeTransforms({
                transform: LoveboatDefaults,
                options: {
                    defaults: {
                        method: 'get',
                        config: { app: { fromDefault: true } }
                    }
                }
            });

            server.loveboat({
                path: '/',
                handler: (request, reply) => reply('ok'),
                config: {
                    app: { fromRoute: true }
                }
            });

            const routes = server.table()[0].table;

            expect(routes).to.have.length(1);
            expect(routes[0].method).to.equal('get');
            expect(routes[0].settings.app).to.equal({
                fromRoute: true,
                fromDefault: true
            });
            done();
        });

    });

});
