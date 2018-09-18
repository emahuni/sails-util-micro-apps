let __line = new require('lineno')(__filename).get;

const testMicroApp = require('./helpers/test-micro-app');

describe('Sails-hook-micro-apps Hook tests #', function () {

    // Test that Sails can lift with the hook in place
    it(`@${__line()} doesn\'t crash Sails`, async function () {
        return true;
    });

    // this tests the app api that we know was loaded normally, nothing should fail otherwise we have broken tests in testMicroApp
    context(`App API control test - none under here should fail, otherwise the test is broken::`, async function () {
						  testMicroApp('makes sure that the tests are working as expected', 'app');
				});

    // now test the injections
    context('Models Injection ::', async function () {
				    context(`Before ORM Hook - Micro App injection ::`, async function () {
						      testMicroApp('Injected using the parent module path', 'before');
				    });

				    context(`After ORM Hook - Micro App injection ::`, async function () {
						      testMicroApp('Injected using a path given to configure and adapt in the requiring module', 'after');
				    });

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
