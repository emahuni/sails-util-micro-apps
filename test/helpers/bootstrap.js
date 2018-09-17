const Sails = require('sails').Sails;

global.chai = require('chai');
global.expect = chai.expect;

global.chalk = require('chalk');
global._ = require('lodash');

const util = require('util');

const console = require('contrace')({
    stackIndex: 1,
    methods: [ 'silly', 'verbose', 'info', 'debug', 'warn', 'error' ],
});


// Before running any tests, attempt to lift Sails
before(function (done) {
    // Hook will timeout in 10 seconds
    this.timeout(11000);

    // change the working dir to test so we load test app
    process.chdir('./test/fixtures/app');

    // Attempt to lift sails
    Sails().load({
        port: 1300,
        log: {
            level: 'silly',
            custom: console,
            inspect: false,
        },
        hooks: {
            // load this hook before sails ORM
            "beforeORM": require('../fixtures/sails-hook-before-orm'),
            // load the ORM
            "orm": require('sails-hook-orm'),
            // Load this hook after sails ORM
            "afterORM": require('../fixtures/sails-hook-after-orm'),
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
				// sails.log.debug('models:', util.inspect(sails.models));
				// sails.log.debug('helpers:', sails.helpers);
        return sails.lower(done);
    }

    // Otherwise just return
    return done();
});
