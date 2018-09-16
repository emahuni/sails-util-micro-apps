const Sails = require('sails').Sails;
const chai = require('chai');
const expect = chai.expect;
const nodeUtil = require('util');
const chalk = require('chalk');
const console = require('contrace')({
    stackIndex: 1,
    methods: [ 'silly', 'verbose', 'info', 'debug', 'warn', 'error' ],
});

let __line = new require('lineno')(__filename).get;

describe('Basic tests ::', function () {
    // Before running any tests, attempt to lift Sails
    before(function (done) {
        // Hook will timeout in 10 seconds
        this.timeout(11000);

        // change the working dir to test so we load test app
        process.chdir('./test/app');

        // Attempt to lift sails
        Sails().load({
            port: 1300,
            hooks: {
                // load this hook before sails ORM
                "beforeORM": require('./sails-hook-before-orm'),
                // load the ORM
                "orm": require('sails-hook-orm'),
                // Load this hook after sails ORM
                "afterORM": require('./sails-hook-after-orm'),
            },
            log: {
                level: 'silly',
                custom: console,
                inspect: true,
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

    context(' ::', async function () {
        let people, houses, statuses, sharedResults;

        before('load seeds', async function () {
            // Great care should be taken when altering the seeds, tests are highly dependant on them.
            // If altered, all passing tests should pass as they did before the alteration.

            // create people
            people = await Person.createEach([{
                id: 1,
                firstname: 'Tendai',
                lastname: 'Mahobho'
            },
            {
                id: 2,
                firstname: 'Boydho',
                lastname: 'Zugo'
            },
            {
                id: 3,
                firstname: 'Nyarai',
                lastname: 'Chengetwa'
            }, // this is the only one who is homeless :D
            {
                id: 4,
                firstname: 'Pericle',
                lastname: 'Ncube'
            },
            ]).fetch();

            // create houses
            houses = await House.createEach([{
                id: 1,
                address: '11055 St Mary\'s'
            },
            {
                id: 2,
                address: '2123 Gaydon Borrowdale'
            },
            {
                id: 3,
                address: '15 Chaza Harare'
            }, // only one without anybody home
            {
                id: 4,
                address: '1443 Murombedzi'
            },
            ]).fetch();

            // create statuses
            statuses = await Status.createEach([{
                id: 1,
                label: 'Dead',
                color: 'yellow'
            },
            {
                id: 2,
                label: 'Inactive',
                color: 'black'
            },
            {
                id: 3,
                label: 'Zero',
                color: 'white'
            },
            {
                id: 4,
                label: 'Full',
                color: 'blue'
            },
            {
                id: 5,
                label: 'Dangerous',
                color: 'red'
            }, // unused
            ]).fetch();
        });


    });
});
