const Sails = require('sails').Sails;
const chai = require('chai');
const expect = chai.expect;
const nodeUtil = require('util');
const chalk = require('chalk');
const _ = require('lodash');

const console = require('contrace')({
    stackIndex: 1,
    methods: [ 'silly', 'verbose', 'info', 'debug', 'warn', 'error' ],
});

let __line = new require('lineno')(__filename).get;


const testMicroApp = require('./helpers/test-micro-app');


describe('Sails-hook-micro-apps Hook tests #', function () {
    // Before running any tests, attempt to lift Sails
    before(function (done) {
        // Hook will timeout in 10 seconds
        this.timeout(11000);

        // change the working dir to test so we load test app
        process.chdir('./test/app');

        // Attempt to lift sails
        Sails().load({
            port: 1300,
            log: {
                level: 'debug',
                custom: console,
                inspect: false,
            },
            hooks: {
                // load this hook before sails ORM
                "beforeORM": require('./sails-hook-before-orm'),
                // load the ORM
                "orm": require('sails-hook-orm'),
                // Load this hook after sails ORM
                "afterORM": require('./sails-hook-after-orm'),
            },

            models: {
                migrate: "drop",
            },

        }, function (err, _sails) {
            if (err) return done(err);

            global.sails = _sails;
            global.log = sails.log;
            // log =  console;

            // log('models: %o', sails.models);
            return done();
        });
    });

    // After tests are complete, lower Sails
    after(function (done) {
        // Lower Sails (if it successfully lifted)
        if (sails) {
            return sails.lower(done);
        }

        // Otherwise just return
        return done();
    });

    // Test that Sails can lift with the hook in place
    it(`@${__line()} doesn\'t crash Sails`, async function () {
        return true;
    });

    context('Models Injection ::', async function () {
				testMicroApp('before');
				testMicroApp('after');
    });

});
