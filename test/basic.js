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
    });

		async function testMicroApp (mApp) {
				let mAppModel, mAppModelName = _.upperFirst(mApp);

				before ( function () {
						mAppModel = global[mAppModelName]; // the reason why I am plucking this from global is for me to test if it was globalised properly
				});

				context(`${mAppModelName} model ::`, async function () {
						it(`successfully injected ${mAppModelName} model`, async function (){
								expect(sails.models[mApp]).to.be.an('object');
								expect(mAppModel).to.be.an('object');
						});

						it(`can (create & find) records`, async function (){
								for (let i=0; i<3; i++){
										await mAppModel.create({
												name: `${mApp} ${i}`
										});
								}

								let recs = await mAppModel.find();

								expect(recs).to.be.an('array').with.lengthOf(3);
								expect(recs[1].name).to.be.eql(`${mApp} 1`);
						});

						it(`can (update) records`, async function (){
								let recs = await mAppModel.update({name: `${mApp} 2`}, {name: `${mApp} 2.1`}).fetch();

								expect(recs[0].name).to.be.eql(`${mApp} 2.1`);
						});

						it(`can (delete) records`, async function (){
								await mAppModel.destroy({});

								let recs = await mAppModel.find();

								expect(recs).to.be.an('array').with.lengthOf(0);
						});

				});
		}
});
