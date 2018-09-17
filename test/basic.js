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
				it(`successfully injected Before model`, async function (){
						expect(sails.models.before).to.be.an('object');
						expect(Before).to.be.an('object');
				});

				it(`can use Before model (create & find)`, async function (){
						await Before.createEach([
								{
										name: 'before 1'
								},
								{
										name: 'before 2'
								},
								{
										name: 'before 3'
								},
						]);
						let befores = await Before.find();

						expect(befores).to.be.an('array').with.lengthOf(3);
						expect(befores[1].name).to.be.eql('before 2');
				});

				it(`can use Before model (update)`, async function (){
						let befores = await Before.update({name: 'before 3'}, {name: 'before 3.1'}).fetch();

						expect(befores[0].name).to.be.eql('before 3.1');
				});

				it(`can use Before model (delete)`, async function (){
						await Before.destroy({});

						let befores = await Before.find();

						expect(befores).to.be.an('array').with.lengthOf(0);
				});

    });
});
