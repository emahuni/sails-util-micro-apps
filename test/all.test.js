let __line = new require('lineno')(__filename).get;

const testMicroApp = require('./helpers/test-micro-app');

describe('Sails-hook-micro-apps Hook tests #', function () {

    // Test that Sails can lift with the hook in place
    it(`@${__line()} doesn\'t crash Sails`, async function () {
        return true;
    });

    context('Models Injection ::', async function () {
				testMicroApp('Injected using the parent module path', 'before');
				testMicroApp('Injected using a path given to configure and adapt in the requiring module', 'after');

				context(`Runtime Micro App injection ::`, async function () {
						before(async function (){
								const loader = require('../')(sails, __dirname + '/fixtures/runtime-micro-app');

								loader.configure();

								loader.adapt();
						});

						testMicroApp(`Injected by using given loader path)`, 'runtime');
				});
    });

});
